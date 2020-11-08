import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useQuery, useMutation } from '@apollo/client'
import { ALL_LISTS, DELETE_LIST, ADD_LIST } from '../requests/lists'
import Link from 'next/link'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';

export default function MenuDrawer(props) {
    const [open, setOpen] = React.useState(props.open);
    const [shoppingListOpen, setShoppingListOpen] = React.useState(true);

    React.useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const { loading, error, data } = useQuery(ALL_LISTS)
    const [deleteList, { deletedList }] = useMutation(DELETE_LIST,
        {
            refetchQueries: [{
                query: ALL_LISTS
            }]
        });

    const [addList, { addedList }] = useMutation(ADD_LIST,
        {
            refetchQueries: [{
                query: ALL_LISTS
            }]
        });

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

    if (error) return <p>Erreur :(</p>
    if (loading) return <p>Loading !</p>

    return (
        <Drawer
            open={open}
            onClose={toggleDrawer(false)}
        >
            <List>
                <Link href={`/`} passHref>
                    <ListItem button component="a" onClick={(e) => {props.onCloseCallback && props.onCloseCallback(false)}}>

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
                    <List>
                        {data.lists.map((list) => (
                            <Link href={`/list/${list.id}`} passHref key={list.id}>
                                <ListItem button component="a" key={list.id} onClick={(e) => {props.onCloseCallback && props.onCloseCallback(false)}}>
                                    <ListItemText primary={list.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments" onClick={() => { deleteList({ variables: { id: list.id } }) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Link>
                        ))}
                        <ListItem>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    addList({ variables: { name: e.target.[0].value } });
                                }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <TextField label="Nouvelle liste" variant="filled" size="small" />
                                    </Grid>
                                    <Grid item>
                                        <IconButton type="submit">
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    )
}
