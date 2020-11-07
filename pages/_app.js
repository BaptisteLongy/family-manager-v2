//import '../styles/globals.css'
import MenuDrawer from '../components/drawer';
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import Header from '../components/header'
import Footer from '../components/footer'
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react'
import Container from '@material-ui/core/Container';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <ApolloProvider client={apolloClient}>
        <MenuDrawer />
        <Container maxWidth="sm">
          <Component {...pageProps} />
        </Container>
      </ApolloProvider>
      <Footer />
    </React.Fragment>
  )

}

export default MyApp
