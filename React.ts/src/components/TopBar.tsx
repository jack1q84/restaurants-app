import { Box, Typography, IconButton, Badge, Divider } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

export default function TopBar() {
  return (
    <Box
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        px: 3,
        bgcolor: '#1A0F0A',
        color: '#F5EDE3',
        borderBottom: '1px solid rgba(245, 237, 227, 0.08)',
        flexShrink: 0,
      }}
    >
      <Box sx={{ flex: 1 }} />

      <Typography
        sx={{
          fontFamily: "'Playfair Display', 'Times New Roman', serif",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: '#F5EDE3',
        }}
      >
        Ric's Diner
      </Typography>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ height: 28, borderColor: 'rgba(245, 237, 227, 0.2)', my: 'auto' }}
        />
        <IconButton sx={{ color: '#F5EDE3' }}>
          <Badge badgeContent={0} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}>
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <Typography sx={{ fontSize: 13, color: '#F5EDE3', fontWeight: 500, mr: 1 }}>
          購物車
        </Typography>
      </Box>
    </Box>
  )
}
