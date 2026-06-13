import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import TopBar from './components/TopBar'
import MenuPanel from './components/MenuPanel'
import DetailPanel from './components/DetailPanel'
import { theme, colors } from './theme'
import { isMenuItem } from './data/menuData'
import type { MenuItem, ComboItem } from './data/menuData'

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | ComboItem | null>(null)

  const selectedCode = selectedItem && isMenuItem(selectedItem) ? selectedItem.code : null

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
          bgcolor: colors.cream,
        }}
      >
        <TopBar />
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <MenuPanel
            onSelectItem={setSelectedItem}
            selectedCode={selectedCode}
          />
          <DetailPanel selectedItem={selectedItem} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
