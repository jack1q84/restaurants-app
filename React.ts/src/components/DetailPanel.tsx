import { Box, Typography, Fab } from '@mui/material'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import { useMemo } from 'react'
import type { MenuItem, ComboItem } from '../data/menuData'
import { imageFiles } from '../data/menuData'

interface Props {
  selectedItem: MenuItem | ComboItem | null
}

export default function DetailPanel({ selectedItem }: Props) {
  const imageUrl = useMemo(() => {
    if (!selectedItem || !('code' in selectedItem)) return null
    const code = selectedItem.code
    if (imageFiles.includes(code)) return `/data/${code}.jpg`
    const shuffled = [...imageFiles].sort(() => Math.random() - 0.5)
    return `/data/${shuffled[0]}.jpg`
  }, [selectedItem])

  const displayName = selectedItem?.name ?? ''
  const displayPrice = selectedItem?.price ?? 0
  const displayDesc = 'description' in (selectedItem ?? {}) ? selectedItem?.description : ''
  const dietLabel = 'dietLabel' in (selectedItem ?? {}) ? (selectedItem as MenuItem)?.dietLabel : undefined
  const spiciness = 'spiciness' in (selectedItem ?? {}) ? (selectedItem as MenuItem)?.spiciness : undefined

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFFCF7',
        position: 'relative',
        height: '100%',
      }}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={displayName}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      ) : (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#F5F0EB',
            color: '#BDB5AA',
          }}
        >
          <Typography sx={{ fontSize: 64, fontWeight: 200, opacity: 0.3, mb: 2 }}>
            ✦
          </Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 500, letterSpacing: 2 }}>
            食物圖片
          </Typography>
          <Typography sx={{ fontSize: 13, mt: 1, opacity: 0.6 }}>
            請從左側選擇餐點
          </Typography>
        </Box>
      )}

      {selectedItem && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            px: 4,
            pb: 10,
            pt: 6,
          }}
        >
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#FFF' }}>
            {displayName}
          </Typography>
          {displayDesc && (
            <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
              {displayDesc}
            </Typography>
          )}
          {(dietLabel || (spiciness && spiciness !== '不辣')) && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              {dietLabel && (
                <Box sx={{ px: 1.5, py: 0.3, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.15)', fontSize: 11, color: '#FFF' }}>
                  {dietLabel}
                </Box>
              )}
              {spiciness && spiciness !== '不辣' && (
                <Box sx={{ px: 1.5, py: 0.3, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.15)', fontSize: 11, color: '#FFF' }}>
                  {spiciness}
                </Box>
              )}
            </Box>
          )}
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#FFF', mt: 1 }}>
            ${displayPrice.toLocaleString()}
          </Typography>
        </Box>
      )}

      {selectedItem && (
        <Fab
          variant="extended"
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            bgcolor: '#2C1810',
            color: '#F5EDE3',
            fontWeight: 600,
            fontSize: 15,
            px: 3,
            borderRadius: 28,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            '&:hover': { bgcolor: '#4A2C20' },
            textTransform: 'none',
            gap: 1,
          }}
        >
          <AddShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
          加入購物車
        </Fab>
      )}
    </Box>
  )
}
