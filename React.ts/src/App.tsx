import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import TopBar from './components/TopBar'
import MenuPanel from './components/MenuPanel'
import DetailPanel from './components/DetailPanel'
import CartDialog from './components/CartDialog'
import CartReview from './components/CartReview'
import OrderSuccessDialog from './components/OrderSuccessDialog'
import { theme } from './theme'
import { itemPriceMap, allItems, isMenuItem } from './data/menuData'
import type { MenuItem, ComboItem } from './data/menuData'

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | ComboItem | null>(null)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [lockedItems, setLockedItems] = useState<Set<string>>(new Set())
  const [dialogItem, setDialogItem] = useState<MenuItem | ComboItem | null>(null)
  const [showCartReview, setShowCartReview] = useState(false)
  const [showOrderSuccess, setShowOrderSuccess] = useState(false)

  const dialogItemRef = useRef(dialogItem)
  useEffect(() => { dialogItemRef.current = dialogItem }, [dialogItem])

  const selectedCode = selectedItem && isMenuItem(selectedItem) ? selectedItem.code : null

  const setQuantity = useCallback((code: string, qty: number) => {
    setCart(prev => ({ ...prev, [code]: Math.max(0, qty) }))
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
    if (lockedItems.has(item.code)) return
    setCart(prev => ({ ...prev, [item.code]: (prev[item.code] ?? 0) + 1 }))
    setDialogItem(item)
  }, [lockedItems])

  const handleCancel = useCallback(() => {
    const item = dialogItemRef.current
    if (!item) return
    setQuantity(item.code, 0)
    setDialogItem(null)
  }, [setQuantity])

  const handleSubmit = useCallback(() => {
    setLockedItems(prev => {
      const next = new Set(prev)
      for (const [code, qty] of Object.entries(cart)) {
        if (qty > 0) next.add(code)
      }
      return next
    })
    setShowCartReview(false)
    setShowOrderSuccess(true)
  }, [cart])

  const handleContinueOrdering = useCallback(() => {
    setShowOrderSuccess(false)
  }, [])

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
        <TopBar
          totalItems={totalItems}
          totalPrice={totalPrice}
          onCartClick={() => setShowCartReview(true)}
        />
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

      {showCartReview && (
        <CartReview
          cart={cart}
          allItems={allItems}
          lockedItems={lockedItems}
          onSetQuantity={setQuantity}
          onSubmit={handleSubmit}
          onClose={() => setShowCartReview(false)}
        />
      )}

      {showOrderSuccess && (
        <OrderSuccessDialog onContinue={handleContinueOrdering} />
      )}
    </ThemeProvider>
  )
}
