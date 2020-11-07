import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenue sur le Family Manager d'Epône !
        </h1>
      </main>

      <footer className={styles.footer}>
        Powered by Baptiste - Family Manager v2
          <a href="https://github.com/BaptisteLongy/family-manage-v2">GitHub</a>

      </footer>
    </div>
  )
}
