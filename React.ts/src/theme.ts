import { createTheme } from '@mui/material/styles'

export const colors = {
  cream: '#FFFCF7',
  creamLight: '#FFFDF9',
  brown: '#1A0F0A',
  brownDark: '#2C1810',
  brownLight: '#4A2C20',
  red: '#8B1A1A',
  beige: '#F5EDE3',
  beige08: 'rgba(245, 237, 227, 0.08)',
  beige20: 'rgba(245, 237, 227, 0.2)',
  beigeLight: '#F8F5F0',
  muted: '#8A7B6E',
  border: '#EDE8E0',
  hover: '#F5F0EB',
  mutedText: '#BDB5AA',
  white: '#FFF',
  chip: {
    vegan: { bg: '#E8F5E9', text: '#2E7D32' },
    vegetarian: { bg: '#F3E5F5', text: '#7B1FA2' },
    default: { bg: '#F5F5F5', text: '#757575' },
    spicy: { bg: '#FFF3E0', text: '#E65100' },
  },
  selected: {
    bg: 'rgba(139, 26, 26, 0.06)',
    bgHover: 'rgba(139, 26, 26, 0.10)',
  },
} as const

export const dialogPaperSx = {
  borderRadius: 3,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
} as const

export const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans TC', 'Inter', -apple-system, sans-serif",
  },
  shape: { borderRadius: 8 },
})
