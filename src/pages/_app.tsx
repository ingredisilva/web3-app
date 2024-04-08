import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import createEmotionCache from '../createEmotionCache'
import Store, { AppState, useSelector } from '../store/Store'
import { ThemeSettings } from '../theme/Theme'
import RTL from './../layouts/full/shared/customizer/RTL'

import '../utils/i18n'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import '@/styles/globals.css'
import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react'

const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps }: any = props
  const theme = ThemeSettings()
  const customizer = useSelector((state: AppState) => state.customizer)
  const { activeMode } = useSelector((state) => state.customizer);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mode = localStorage.getItem('themeMode') || 'light';
      document.body.className = mode;
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <title>SparqDesk</title>
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <RTL direction={customizer.activeDir}>
            <CssBaseline />
            <Component {...pageProps} />
          </RTL>
        </SnackbarProvider>
      </ThemeProvider>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='colored'
      />
    </CacheProvider >
  )
}

export default (props: MyAppProps) => (
  <Provider store={Store}>
    <MyApp {...props} />
  </Provider>
)
