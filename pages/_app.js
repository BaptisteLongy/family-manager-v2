import '../styles/globals.css'
import MenuDrawer from '../components/drawer';
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <div>
      <ApolloProvider client={apolloClient}>
        <MenuDrawer />
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  )

}

export default MyApp
