import PageContainer from '@/components/container/PageContainer'
import Language from '@/layouts/full/vertical/header/Language'
import ToggleMode from '@/layouts/full/vertical/header/ToggleMode'
import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const Error = () => {
  const { t } = useTranslation()

  return (
    <PageContainer>
      <Box
        position="absolute"
        right={30}
        top={10}
        display="flex"
        alignItems="center"
        gap={2}>
        <Language />
        <ToggleMode />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        textAlign="center"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <img
            src={'/images/backgrounds/website-under-construction.gif'}
            alt="404"
            style={{ width: '100%', maxWidth: '500px' }}
          />
          <Typography align="center" variant="h1" mb={4}>
            {t('label-404-title')}
          </Typography>
          <Typography align="center" variant="h4" mb={4}>
            {t('label-404-description')}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            component={Link}
            href="/chat"
            disableElevation
          >
            {t('label-back-to-home')}
          </Button>
        </Container>
      </Box>
    </PageContainer>
  )
}

Error.layout = 'Blank'
export default Error
