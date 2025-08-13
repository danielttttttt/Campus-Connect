import '../styles/globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'

// Configure the Inter font with specific subsets and weights
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} font-sans min-h-screen bg-gray-50`}>
      <Head>
        <title>Campus Connect</title>
        <meta name="description" content="Connect with your campus community" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
