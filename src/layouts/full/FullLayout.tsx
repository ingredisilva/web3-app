import { AppState, useSelector } from '@/store/Store'
import { Box, Container, styled, useTheme } from '@mui/material'
import Header from './vertical/header/Header'

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%'
}))

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent'
}))

interface Props {
  children: React.ReactNode
}

const FullLayout: React.FC<Props> = ({ children }) => {
  return (
    <MainWrapper>
      <Header />
      <Container
        sx={{
          maxWidth: '100%!important',
          padding: '0px !important',
          height: '100vh'
        }}
      >
        <Box
          sx={{
                  display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '10px',
            height: 'calc(100vh - 80px)'
          }}
        >
          {children}
        </Box>
        {/* <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box> */}
      </Container>
    </MainWrapper>
  )
}

export default FullLayout
