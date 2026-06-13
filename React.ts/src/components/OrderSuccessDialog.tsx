import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography,
} from '@mui/material'
import { colors, dialogPaperSx } from '../theme'

interface Props {
  onContinue: () => void
}

export default function OrderSuccessDialog({ onContinue }: Props) {
  return (
    <Dialog
      open
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: { ...dialogPaperSx, textAlign: 'center' },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, color: colors.brownDark, pb: 0, pt: 4 }}>
        訂單已送出
      </DialogTitle>
      <DialogContent sx={{ pb: 3 }}>
        <Typography sx={{ fontSize: 15, color: colors.muted, mt: 1, lineHeight: 1.6 }}>
          正在為您準備餐點當中…
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center' }}>
        <Button
          onClick={onContinue}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: colors.brownDark, color: colors.beige, borderRadius: 2, py: 1.2,
            fontWeight: 600, textTransform: 'none', fontSize: 15,
            '&:hover': { bgcolor: colors.brownLight },
          }}
        >
          繼續點餐
        </Button>
      </DialogActions>
    </Dialog>
  )
}
