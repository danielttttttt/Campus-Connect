import '../styles/globals.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthContext'
import { AppProvider } from '../context/AppContext'
import { ToastContainer } from '../components/ui/Toast'
import ErrorBoundary from '../components/ErrorBoundary'
import { useApp } from '../context/AppContext'

// Configure the Inter font with specific subsets and weights
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Toast container component that uses the app context
function ToastProvider() {
  const { toasts, removeToast } = useApp();
  return <ToastContainer toasts={toasts} onRemove={removeToast} />;
}

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
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
            <ToastProvider />
          </div>
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default MyApp
