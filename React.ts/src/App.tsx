import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import TopBar from './components/TopBar'
import MenuPanel from './components/MenuPanel'
import DetailPanel from './components/DetailPanel'
import type { MenuItem, ComboItem } from './data/menuData'

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans TC', 'Inter', -apple-system, sans-serif",
  },
  shape: { borderRadius: 8 },
})

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | ComboItem | null>(null)

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
        <TopBar />
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <MenuPanel
            onSelectItem={setSelectedItem}
            selectedCode={selectedItem && 'code' in selectedItem ? selectedItem.code : null}
          />
          <DetailPanel selectedItem={selectedItem} />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
