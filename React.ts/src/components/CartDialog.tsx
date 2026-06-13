import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton, Typography, Box,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { colors } from '../theme'
import type { MenuItem, ComboItem } from '../data/menuData'

interface Props {
  item: MenuItem | ComboItem
  quantity: number
  onSetQuantity: (code: string, qty: number) => void
  onCancel: () => void
  onClose: () => void
}

export default function CartDialog({ item, quantity, onSetQuantity, onCancel, onClose }: Props) {
  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 0, fontWeight: 600, color: colors.brownDark }}>
        {item.name}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: 'center', fontSize: 14, color: colors.muted, mt: 1 }}>
          ${item.price.toLocaleString()} / 份
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, py: 2 }}>
          <IconButton
            onClick={() => onSetQuantity(item.code, quantity - 1)}
            sx={{
              bgcolor: colors.hover,
              '&:hover': { bgcolor: colors.border },
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ fontSize: 28, fontWeight: 700, minWidth: 48, textAlign: 'center', color: colors.brownDark }}>
            {quantity}
          </Typography>
          <IconButton
            onClick={() => onSetQuantity(item.code, quantity + 1)}
            sx={{
              bgcolor: colors.hover,
              '&:hover': { bgcolor: colors.border },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Typography sx={{ textAlign: 'center', fontSize: 16, color: colors.red, fontWeight: 700 }}>
          小計：${(item.price * quantity).toLocaleString()}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          fullWidth
          sx={{
            borderColor: colors.border,
            color: colors.muted,
            borderRadius: 2,
            py: 1.2,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: 15,
            '&:hover': { borderColor: colors.muted, bgcolor: colors.hover },
          }}
        >
          取消
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: colors.brownDark,
            color: colors.beige,
            borderRadius: 2,
            py: 1.2,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: 15,
            '&:hover': { bgcolor: colors.brownLight },
          }}
        >
          確認
        </Button>
      </DialogActions>
    </Dialog>
  )
}
