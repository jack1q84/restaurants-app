import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { useState, useMemo, useCallback } from 'react'
import TopBar from './components/TopBar'
import MenuPanel from './components/MenuPanel'
import DetailPanel from './components/DetailPanel'
import CartDialog from './components/CartDialog'
import { theme } from './theme'
import { itemPriceMap, isMenuItem } from './data/menuData'
import type { MenuItem, ComboItem } from './data/menuData'

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | ComboItem | null>(null)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [dialogItem, setDialogItem] = useState<MenuItem | ComboItem | null>(null)

  const selectedCode = selectedItem && isMenuItem(selectedItem) ? selectedItem.code : null

  const setQuantity = useCallback((code: string, qty: number) => {
    setCart(prev => {
      if (qty <= 0) {
        const next = { ...prev }
        delete next[code]
        return next
      }
      return { ...prev, [code]: qty }
    })
  }, [])

  const totalItems = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart],
  )

  const totalPrice = useMemo(
    () => Object.entries(cart).reduce((sum, [code, qty]) => sum + (itemPriceMap[code] ?? 0) * qty, 0),
    [cart],
  )

  const handleAddToCart = useCallback((item: MenuItem | ComboItem) => {
    setCart(prev => ({ ...prev, [item.code]: (prev[item.code] ?? 0) + 1 }))
    setDialogItem(item)
  }, [])

  const handleCancel = useCallback(() => {
    if (!dialogItem) return
    setQuantity(dialogItem.code, 0)
    setDialogItem(null)
  }, [dialogItem, setQuantity])

  const dialogQuantity = dialogItem ? (cart[dialogItem.code] ?? 0) : 0

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: '#FFFCF7',
        }}
      >
        <TopBar totalItems={totalItems} totalPrice={totalPrice} />
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <MenuPanel
            onSelectItem={setSelectedItem}
            selectedCode={selectedCode}
          />
          <DetailPanel selectedItem={selectedItem} onAddToCart={handleAddToCart} />
        </Box>
      </Box>

      {dialogItem && (
        <CartDialog
          item={dialogItem}
          quantity={dialogQuantity}
          onSetQuantity={setQuantity}
          onCancel={handleCancel}
          onClose={() => setDialogItem(null)}
        />
      )}
    </ThemeProvider>
  )
}
