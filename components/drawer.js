import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useQuery } from '@apollo/client'
import { ALL_LISTS } from '../requests/lists'
import Link from 'next/link'

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function MenuDrawer() {
    const [open, setOpen] = React.useState(false);

    const { loading, error, data } = useQuery(ALL_LISTS)

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    if (error) return <p>Erreur :(</p>
    if (loading) return <p>Loading !</p>

    return (
        <div>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
            >
                <List>
                    {data.lists.map((list) => (
                        <Link href={`/list/${list.id}`} passHref key={list.id}>
                            <ListItem button component="a" key={list.id}>
                                <ListItemText primary={list.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}
