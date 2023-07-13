import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from './drawer'
import React from 'react'
import { useRouter } from 'next/router'

export default function ApplicationBar({ menuTitle }) {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const router = useRouter()

    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(!openDrawer);
    };

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        {menuTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <MenuDrawer open={openDrawer} onCloseCallback={setOpenDrawer} />
        </React.Fragment>
    )
}