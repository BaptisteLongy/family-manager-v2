import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import Header from '../components/header'
import Footer from '../components/footer'
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ApplicationBar from '../components/appBar'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const [menuTitle, setMenuTitle] = React.useState("Accueil")

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <ApolloProvider client={apolloClient}>
        <ApplicationBar menuTitle={menuTitle} />
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item>
              <Component {...pageProps} setMenuTitle={setMenuTitle} />
            </Grid>
            <Grid item>
              <Footer />
            </Grid>
          </Grid>
        </Container>
      </ApolloProvider>
    </React.Fragment>
  )

}

export default MyApp
