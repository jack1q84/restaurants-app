import { Box, Typography, Tabs, Tab, List, ListItemButton, ListItemText, Chip, Divider } from '@mui/material'
import { useState, useMemo, useEffect, useRef } from 'react'
import { colors } from '../theme'
import { menuItems, categories, combos, isMenuItem } from '../data/menuData'
import type { MenuItem, ComboItem } from '../data/menuData'

type TabKind = 'combo' | 'category' | 'vegetarian'

interface TabItem {
  kind: TabKind
  label: string
  value: string
}

const allTabs: TabItem[] = [
  { kind: 'combo', label: '套餐組合', value: 'combo' },
  ...categories.map(c => ({ kind: 'category' as TabKind, label: c, value: c })),
  { kind: 'vegetarian', label: '素食', value: 'vegetarian' },
]

function chipSx(label: string) {
  if (label === '純素') return { bgcolor: colors.chip.vegan.bg, color: colors.chip.vegan.text }
  if (label === '素食') return { bgcolor: colors.chip.vegetarian.bg, color: colors.chip.vegetarian.text }
  return { bgcolor: colors.chip.default.bg, color: colors.chip.default.text }
}

const chipBaseSx = { height: 18, fontSize: 10 }
const spicyChipSx = { ...chipBaseSx, bgcolor: colors.chip.spicy.bg, color: colors.chip.spicy.text }

interface Props {
  onSelectItem: (item: MenuItem | ComboItem) => void
  selectedCode: string | null
}

export default function MenuPanel({ onSelectItem, selectedCode }: Props) {
  const [tabIndex, setTabIndex] = useState(1)
  const listRef = useRef<HTMLUListElement>(null)

  const currentTab = allTabs[tabIndex]

  const displayItems: (MenuItem | ComboItem)[] = useMemo(() => {
    if (!currentTab) return menuItems
    if (currentTab.kind === 'combo') return combos
    if (currentTab.kind === 'vegetarian') {
      return menuItems.filter(i =>
        i.dietLabel.includes('素')
      )
    }
    return menuItems.filter(i => i.category === currentTab.value)
  }, [currentTab])

  useEffect(() => {
    if (displayItems.length > 0) {
      onSelectItem(displayItems[0])
      listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [tabIndex, displayItems, onSelectItem])

  return (
    <Box
      sx={{
        width: '30%',
        minWidth: 320,
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: colors.creamLight,
        borderRight: `1px solid ${colors.border}`,
        height: '100%',
      }}
    >
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Tabs
          value={tabIndex >= allTabs.length ? 1 : tabIndex}
          onChange={(_, v) => setTabIndex(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 36,
            '& .MuiTabs-scrollButtons': {
              width: 24, color: colors.muted,
              '&.Mui-disabled': { opacity: 0.3 },
              '&:hover': { bgcolor: colors.hover, borderRadius: 1 },
            },
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTab-root': {
              minHeight: 32,
              py: '4px 12px',
              mr: 0.5,
              borderRadius: '6px 6px 0 0',
              fontSize: 13,
              fontWeight: 500,
              color: colors.muted,
              textTransform: 'none',
              minWidth: 'auto',
              bgcolor: 'transparent',
              border: '1px solid transparent',
              borderBottom: 'none',
              flexShrink: 0,
              '&:hover': { bgcolor: colors.hover },
              '&.Mui-selected': {
                color: colors.red,
                bgcolor: colors.creamLight,
                borderColor: colors.border,
                borderBottom: `1px solid ${colors.creamLight}`,
                mb: '-1px',
                fontWeight: 600,
              },
            },
          }}
        >
          {allTabs.map(tab => (
            <Tab key={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <Divider sx={{ borderColor: colors.border }} />

      <List ref={listRef} sx={{ flex: 1, overflow: 'auto', py: 0, px: 1.5 }}>
        {displayItems.map((item, i) => (
          <ListItemButton
            key={isMenuItem(item) ? item.code : `combo-${i}`}
            selected={isMenuItem(item) ? selectedCode === item.code : false}
            onClick={() => onSelectItem(item)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              px: 2,
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: colors.selected.bg,
                '&:hover': { bgcolor: colors.selected.bgHover },
              },
              '&:hover': { bgcolor: colors.beigeLight },
            }}
          >
            <ListItemText
              sx={{ m: 0 }}
              primary={
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: colors.brownDark, lineHeight: 1.3 }}>
                  {item.name}
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  sx={{ fontSize: 12, color: colors.muted, mt: 0.3, display: 'block', lineHeight: 1.4 }}
                >
                  {item.description}
                  {isMenuItem(item) && (
                    <Box component="span" sx={{ display: 'inline-flex', gap: 0.5, ml: 0.5 }}>
                      <Chip label={item.dietLabel} size="small" sx={{ ...chipBaseSx, ...chipSx(item.dietLabel) }} />
                      {item.spiciness !== '不辣' && (
                        <Chip label={item.spiciness} size="small" sx={spicyChipSx} />
                      )}
                    </Box>
                  )}
                </Typography>
              }
            />
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: colors.red, ml: 2, whiteSpace: 'nowrap' }}>
              ${item.price.toLocaleString()}
            </Typography>
          </ListItemButton>
        ))}
        {displayItems.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center', color: colors.mutedText }}>
            <Typography sx={{ fontSize: 14 }}>無符合項目</Typography>
          </Box>
        )}
      </List>
    </Box>
  )
}
