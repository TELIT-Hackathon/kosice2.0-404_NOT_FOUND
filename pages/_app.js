import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Component {...pageProps} />
      </>
)
}

import '../styles/globals.css'
import '../styles/login.css'

export default MyApp
