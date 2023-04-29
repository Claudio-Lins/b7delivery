import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as AppContextProvider } from '../../contexts/app'
import { Provider as AuthContextProvider } from '../../contexts/auth'
import { Inter, Montserrat, Old_Standard_TT } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })
const oldStandardTT = Old_Standard_TT({
  subsets: ['latin'],
  weight: '400'
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <main className={montserrat.className}>
          <Component {...pageProps} />
        </main>
      </AppContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
