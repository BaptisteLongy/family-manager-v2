import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useQuery, useMutation } from '@apollo/client'
import { ALL_LISTS, DELETE_LIST, ADD_LIST } from '../requests/lists'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingListMenu from './drawerComponents/shoppingListMenu'

export default function MenuDrawer(props) {
    const [open, setOpen] = React.useState(props.open);
    const [shoppingListOpen, setShoppingListOpen] = React.useState(true);

    React.useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        props.onCloseCallback && props.onCloseCallback(false)
        setOpen(open);
    };

    const toggleShoppingList = () => {
        setShoppingListOpen(!shoppingListOpen);
    };

    return (
        <Drawer
            open={open}
            onClose={toggleDrawer(false)}
        >
            <List>
                    <ListItemButton component={ Link } to={ `/` } onClick={(e) => { props.onCloseCallback && props.onCloseCallback(false) }}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accueil" />
                    </ListItemButton>
                <ListItem onClick={toggleShoppingList}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Listes de courses" />
                    {shoppingListOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={shoppingListOpen} timeout="auto" unmountOnExit>
                    <ShoppingListMenu onCloseCallback={props.onCloseCallback} />
                </Collapse>
            </List>
        </Drawer>
    )
}
