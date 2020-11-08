import React from 'react'
export default function Home({ setMenuTitle }) {

  React.useEffect(() => {
    setMenuTitle && setMenuTitle("Accueil")
  });

  return <h1>Bienvenue sur le Family Manager d'Epône !</h1>
}
