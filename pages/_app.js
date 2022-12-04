import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Header />
        <Component {...pageProps} />
      </>
)
}

import '../styles/globals.css'

export default MyApp
