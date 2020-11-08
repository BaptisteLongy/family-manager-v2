import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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