import { Box, Typography, Tabs, Tab, List, ListItemButton, ListItemText, Chip, Divider } from '@mui/material'
import { useState, useMemo, useEffect, useRef } from 'react'
import type { MenuItem, ComboItem } from '../data/menuData'
import { menuItems, categories, combos } from '../data/menuData'

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
        i.dietLabel.includes('素') || i.dietLabel.includes('純素')
      )
    }
    return menuItems.filter(i => i.category === currentTab.value)
  }, [currentTab])

  useEffect(() => {
    if (displayItems.length > 0) {
      onSelectItem(displayItems[0])
      listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [tabIndex])

  return (
    <Box
      sx={{
        width: '30%',
        minWidth: 320,
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFFDF9',
        borderRight: '1px solid #EDE8E0',
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
              width: 24, color: '#8A7B6E',
              '&.Mui-disabled': { opacity: 0.3 },
              '&:hover': { bgcolor: '#F5F0EB', borderRadius: 1 },
            },
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTab-root': {
              minHeight: 32,
              py: '4px 12px',
              mr: 0.5,
              borderRadius: '6px 6px 0 0',
              fontSize: 13,
              fontWeight: 500,
              color: '#8A7B6E',
              textTransform: 'none',
              minWidth: 'auto',
              bgcolor: 'transparent',
              border: '1px solid transparent',
              borderBottom: 'none',
              flexShrink: 0,
              '&:hover': { bgcolor: '#F5F0EB' },
              '&.Mui-selected': {
                color: '#8B1A1A',
                bgcolor: '#FFFDF9',
                borderColor: '#EDE8E0',
                borderBottom: '1px solid #FFFDF9',
                mb: '-1px',
                fontWeight: 600,
              },
            },
          }}
        >
          {allTabs.map((tab, i) => (
            <Tab key={i} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <Divider sx={{ borderColor: '#EDE8E0' }} />

      <List ref={listRef} sx={{ flex: 1, overflow: 'auto', py: 0, px: 1.5 }}>
        {displayItems.map((item, i) => (
          <ListItemButton
            key={'code' in item ? item.code : `combo-${i}`}
            selected={selectedCode === ('code' in item ? item.code : '')}
            onClick={() => onSelectItem(item)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              px: 2,
              py: 1.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(139, 26, 26, 0.06)',
                '&:hover': { bgcolor: 'rgba(139, 26, 26, 0.10)' },
              },
              '&:hover': { bgcolor: '#F8F5F0' },
            }}
          >
            <ListItemText
              sx={{ m: 0 }}
              primary={
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#2C1810', lineHeight: 1.3 }}>
                  {item.name}
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  sx={{ fontSize: 12, color: '#8A7B6E', mt: 0.3, display: 'block', lineHeight: 1.4 }}
                >
                  {item.description}
                  {'dietLabel' in item && (
                    <Box component="span" sx={{ display: 'inline-flex', gap: 0.5, ml: 0.5 }}>
                      <Chip
                        label={(item as MenuItem).dietLabel}
                        size="small"
                        sx={{
                          height: 18, fontSize: 10,
                          bgcolor: (item as MenuItem).dietLabel === '純素' ? '#E8F5E9' : (item as MenuItem).dietLabel === '素食' ? '#F3E5F5' : '#F5F5F5',
                          color: (item as MenuItem).dietLabel === '純素' ? '#2E7D32' : (item as MenuItem).dietLabel === '素食' ? '#7B1FA2' : '#757575',
                        }}
                      />
                      {'spiciness' in item && (item as MenuItem).spiciness !== '不辣' && (
                        <Chip
                          label={(item as MenuItem).spiciness}
                          size="small"
                          sx={{ height: 18, fontSize: 10, bgcolor: '#FFF3E0', color: '#E65100' }}
                        />
                      )}
                    </Box>
                  )}
                </Typography>
              }
            />
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#8B1A1A', ml: 2, whiteSpace: 'nowrap' }}>
              ${item.price.toLocaleString()}
            </Typography>
          </ListItemButton>
        ))}
        {displayItems.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center', color: '#BDB5AA' }}>
            <Typography sx={{ fontSize: 14 }}>無符合項目</Typography>
          </Box>
        )}
      </List>
    </Box>
  )
}
