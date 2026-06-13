import { Box, Typography, Fab } from '@mui/material'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import { useMemo } from 'react'
import { colors } from '../theme'
import { imageFiles, isMenuItem } from '../data/menuData'
import type { MenuItem, ComboItem } from '../data/menuData'

function seededHash(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

interface Props {
  selectedItem: MenuItem | ComboItem | null
}

export default function DetailPanel({ selectedItem }: Props) {
  const imageUrl = useMemo(() => {
    if (!selectedItem || !isMenuItem(selectedItem)) return null
    const code = selectedItem.code
    if (imageFiles.includes(code)) return `/data/${code}.jpg`
    const idx = seededHash(code) % imageFiles.length
    return `/data/${imageFiles[idx]}.jpg`
  }, [selectedItem])

  const name = selectedItem?.name ?? ''
  const price = selectedItem?.price ?? 0
  const description = selectedItem?.description ?? ''
  const isMenu = selectedItem && isMenuItem(selectedItem)
  const dietLabel = isMenu ? selectedItem.dietLabel : undefined
  const spiciness = isMenu ? selectedItem.spiciness : undefined

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.cream,
        position: 'relative',
        height: '100%',
      }}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={name}
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
            bgcolor: colors.hover,
            color: colors.mutedText,
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
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: colors.white }}>
            {name}
          </Typography>
          {description && (
            <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
              {description}
            </Typography>
          )}
          {(dietLabel || (spiciness && spiciness !== '不辣')) && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              {dietLabel && (
                <Box sx={{ px: 1.5, py: 0.3, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.15)', fontSize: 11, color: colors.white }}>
                  {dietLabel}
                </Box>
              )}
              {spiciness && spiciness !== '不辣' && (
                <Box sx={{ px: 1.5, py: 0.3, borderRadius: 1, bgcolor: 'rgba(255,255,255,0.15)', fontSize: 11, color: colors.white }}>
                  {spiciness}
                </Box>
              )}
            </Box>
          )}
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: colors.white, mt: 1 }}>
            ${price.toLocaleString()}
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
            bgcolor: colors.brownDark,
            color: colors.beige,
            fontWeight: 600,
            fontSize: 15,
            px: 3,
            borderRadius: 28,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            '&:hover': { bgcolor: colors.brownLight },
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
