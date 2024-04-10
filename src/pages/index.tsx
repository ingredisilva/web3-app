import ContractLoader from '@/components/Contracts/ContractLoader'
import Loader from '@/components/Loader/Loader'
import WalletConnect from '@/components/Wallet/WalletConnect'
import PageContainer from '@/components/container/PageContainer'

import Language from '@/layouts/full/vertical/header/Language'
import ToggleMode from '@/layouts/full/vertical/header/ToggleMode'
import { Box, Grid } from '@mui/material'

const Home = () => {
  return (
    <PageContainer>
      <Box position='absolute' right={30} top={10} display='flex' alignItems='center' gap={2}>
        <Language />
        <ToggleMode />
        <WalletConnect onConnected={function (account: string, signer: any): void {
          throw new Error('Function not implemented.')
        } } />
      </Box>
      <Grid container spacing={0} justifyContent='center' sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={12} lg={7} xl={5}>
          <Box
            width='100%'
            height='100vh'
            sx={{
              display: {
                xs: 'none',
                lg: 'flex'
              }
            }}
          >
            <img
              src={'/images/backgrounds/blockchain.webp'}
              alt='Imagem de background'
              style={{
                width: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          lg={5}
          xl={7}
          display='flex'
          justifyContent='center'
          sx={{
            alignItems: {
              lg: 'center'
            }
          }}
        >
          <ContractLoader onContractLoaded={function (contractAddress: string, abi: any): void {
            throw new Error('Function not implemented.')
          }} />
        </Grid>
      </Grid>
    </PageContainer>
  )
}

Home.layout = 'Blank'
export default Home
