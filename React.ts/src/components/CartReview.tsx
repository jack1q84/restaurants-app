import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton, Typography, Box, Divider, List, ListItem,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { colors, dialogPaperSx } from '../theme'
import type { MenuItem, ComboItem } from '../data/menuData'

type ItemState = 'normal' | 'locked' | 'removed'

const stateStyle: Record<ItemState, {
  name: { color: string; decoration: string }
  dimColor: string
  priceColor: string
  priceDecoration: string
}> = {
  normal: {
    name: { color: colors.brownDark, decoration: 'none' },
    dimColor: colors.brownDark,
    priceColor: colors.red,
    priceDecoration: 'none',
  },
  locked: {
    name: { color: colors.brownDark, decoration: 'none' },
    dimColor: colors.muted,
    priceColor: colors.red,
    priceDecoration: 'none',
  },
  removed: {
    name: { color: colors.mutedText, decoration: 'line-through' },
    dimColor: colors.mutedText,
    priceColor: colors.mutedText,
    priceDecoration: 'line-through',
  },
}

interface Props {
  cart: Record<string, number>
  allItems: Record<string, MenuItem | ComboItem>
  lockedItems: Set<string>
  onSetQuantity: (code: string, qty: number) => void
  onSubmit: () => void
  onClose: () => void
}

export default function CartReview({ cart, allItems, lockedItems, onSetQuantity, onSubmit, onClose }: Props) {
  const entries = Object.entries(cart)
    .map(([code, qty]) => ({ code, qty, item: allItems[code] }))
    .filter(e => e.item)

  const canSubmit = entries.some(e => !lockedItems.has(e.code) && e.qty > 0)

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: { ...dialogPaperSx, minHeight: 300 },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 600, color: colors.brownDark }}>
        購物車清單
      </DialogTitle>

      <Divider sx={{ borderColor: colors.border }} />

      {entries.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center', color: colors.mutedText }}>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>您的購物車是空的！</Typography>
        </Box>
      ) : (
        <DialogContent sx={{ px: 2, py: 1 }}>
          <List sx={{ py: 0 }}>
            {entries.map(({ code, qty, item }, i) => {
              const subtotal = item.price * qty
              const removed = qty === 0
              const locked = lockedItems.has(code)
              const state: ItemState = removed ? 'removed' : locked ? 'locked' : 'normal'
              const s = stateStyle[state]

              return (
                <ListItem key={code} sx={{ px: 0.5, py: 1.5, flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography
                      sx={{
                        fontSize: 15, fontWeight: 600, flex: 1,
                        color: s.name.color,
                        textDecoration: s.name.decoration,
                      }}
                    >
                      {item.name}
                      {locked && (
                        <Typography component="span" sx={{ fontSize: 11, color: colors.mutedText, ml: 1, fontWeight: 400 }}>
                          (已送出)
                        </Typography>
                      )}
                    </Typography>

                    {locked ? (
                      <Typography
                        sx={{
                          fontSize: 16, fontWeight: 700, mx: 2, minWidth: 28, textAlign: 'center',
                          color: s.dimColor,
                        }}
                      >
                        x{qty}
                      </Typography>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => onSetQuantity(code, qty - 1)}
                          sx={{ color: s.dimColor }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          sx={{
                            fontSize: 16, fontWeight: 700, minWidth: 28, textAlign: 'center',
                            color: s.dimColor,
                          }}
                        >
                          {qty}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => onSetQuantity(code, qty + 1)}
                          sx={{ color: colors.brownDark }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}

                    <Typography
                      sx={{
                        fontSize: 15, fontWeight: 700, ml: 2, minWidth: 64, textAlign: 'right',
                        color: s.priceColor,
                        textDecoration: s.priceDecoration,
                      }}
                    >
                      ${subtotal.toLocaleString()}
                    </Typography>
                  </Box>
                  {i < entries.length - 1 && (
                    <Divider sx={{ borderColor: colors.border, mt: 1.5 }} />
                  )}
                </ListItem>
              )
            })}
          </List>
        </DialogContent>
      )}

      <Divider sx={{ borderColor: colors.border }} />

      <Box sx={{ px: 3, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: colors.brownDark }}>總計</Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: colors.red }}>
          ${entries.reduce((sum, e) => sum + e.item.price * e.qty, 0).toLocaleString()}
        </Typography>
      </Box>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth={entries.length === 0}
          sx={{
            borderColor: colors.border, color: colors.brownDark, borderRadius: 2, py: 1.2,
            fontWeight: 600, textTransform: 'none', fontSize: 15,
            '&:hover': { borderColor: colors.muted, bgcolor: colors.hover },
          }}
        >
          繼續點餐
        </Button>
        {entries.length > 0 && (
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            variant="contained"
            fullWidth
            sx={{
              bgcolor: colors.red, color: colors.beige, borderRadius: 2, py: 1.2,
              fontWeight: 700, textTransform: 'none', fontSize: 16,
              '&:hover': { bgcolor: '#A02020' },
              '&.Mui-disabled': { bgcolor: colors.border, color: colors.mutedText },
            }}
          >
            送出
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
