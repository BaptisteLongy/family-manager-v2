import React from 'react'
import Typography from '@mui/material/Typography';

export default function Home({ setMenuTitle }) {

  React.useEffect(() => {
    setMenuTitle && setMenuTitle("Accueil")
  });

  return <Typography variant="h5">Bienvenue sur le Family Manager d'Epône !</Typography>
}
