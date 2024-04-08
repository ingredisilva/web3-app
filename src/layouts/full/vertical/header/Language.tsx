import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppState, useDispatch, useSelector } from '../../../../store/Store'
import { setLanguage } from '../../../../store/customizer/CustomizerSlice'

const Languages = [
  {
    flagname: 'english',
    icon: '/images/flag/icon-flag-en.svg',
    value: 'EN_US'
  },
  {
    flagname: 'portuguese',
    icon: '/images/flag/icon-flag-br.svg',
    value: 'PT_BR'
  }
]

const Language = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const open = Boolean(anchorEl)
  const customizer = useSelector((state: AppState) => state.customizer)

  const currentLang = Languages.find((_lang) => _lang.value === customizer.isLanguage) || Languages[1]

  const { i18n, t } = useTranslation()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    i18n.changeLanguage(customizer.isLanguage)
  }, [currentLang])

  useEffect(() => {
    dispatch(setLanguage(localStorage.getItem('lang')))
  }, [])

  return (
    <>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <Avatar src={currentLang.icon} sx={{ width: 20, height: 20 }} />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px'
          }
        }}
      >
        {Languages.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ py: 2, px: 3 }}
            onClick={() => {
              localStorage.setItem('lang', option.value)
              dispatch(setLanguage(option.value))
            }}
          >
            <Stack direction='row' spacing={1} alignItems='center'>
              <Avatar src={option.icon} sx={{ width: 20, height: 20 }} />
              <Typography>{t(option.flagname)}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Language
