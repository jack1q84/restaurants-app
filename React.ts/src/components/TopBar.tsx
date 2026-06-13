import { Box, Typography, IconButton, Badge, Divider } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { colors } from '../theme'

interface Props {
  totalItems: number
  totalPrice: number
}

export default function TopBar({ totalItems, totalPrice }: Props) {
  return (
    <Box
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        px: 3,
        bgcolor: colors.brown,
        color: colors.beige,
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
          color: colors.beige,
        }}
      >
        Ric's Diner
      </Typography>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
        {totalItems > 0 && (
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: colors.beige, mr: 0.5 }}>
            ${totalPrice.toLocaleString()}
          </Typography>
        )}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ height: 28, borderColor: 'rgba(245, 237, 227, 0.2)', my: 'auto' }}
        />
        <IconButton sx={{ color: colors.beige }}>
          <Badge
            badgeContent={totalItems}
            color="error"
            invisible={totalItems === 0}
            sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}
          >
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <Typography sx={{ fontSize: 13, color: colors.beige, fontWeight: 500, mr: 1 }}>
          購物車
        </Typography>
      </Box>
    </Box>
  )
}
