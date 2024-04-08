import { AppState, useDispatch, useSelector } from '@/store/Store'

import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  styled,
  useMediaQuery,
} from '@mui/material'
import { IconMenu2 } from '@tabler/icons-react'
import Language from './Language'
import ToggleMode from './ToggleMode'
import useMedia from '@/hooks/useMedia'
import WalletConnect from '@/components/Wallet/WalletConnect'

const Header = () => {



  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.default,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }))

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }))

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled style={{ alignItems: 'center' }}>
        <IconButton
          color="inherit"
          aria-label="menu"

        >
          <IconMenu2 size="20" />
        </IconButton>
        <WalletConnect />
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Language />
          <ToggleMode />
          <WalletConnect onConnected={function (account: string, signer: any): void {
            throw new Error('Function not implemented.')
          }} />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  )
}

export default Header
