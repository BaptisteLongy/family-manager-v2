import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useQuery, useMutation } from '@apollo/client'
import { ALL_LISTS, DELETE_LIST, ADD_LIST } from '../requests/lists'
import Link from 'next/link'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
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
                <Link href={`/`} passHref>
                    <ListItem button component="a" onClick={(e) => { props.onCloseCallback && props.onCloseCallback(false) }}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accueil" />
                    </ListItem>
                </Link>
                <ListItem button onClick={toggleShoppingList}>
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
