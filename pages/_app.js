import '../styles/globals.css'
import MenuDrawer from '../components/drawer';

function MyApp({ Component, pageProps }) {

  return (
    <div>
      <MenuDrawer/>
      <Component {...pageProps} />
    </div>
  )

}

export default MyApp
