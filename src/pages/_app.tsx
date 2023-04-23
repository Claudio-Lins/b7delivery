import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as AppContextProvider } from '../../contexts/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </AppContextProvider>
  )
}

export default MyApp
