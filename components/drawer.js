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


function ListTextField(props) {
    const { onClickCallback } = props

    const renderTextField = () => {
        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    console.log(e)
                    onClickCallback({ variables: { name: e.target.[0].value } });
                }}
            >
                <TextField label="Nouvelle liste" variant="filled"/>
                <IconButton type="submit">
                    <AddIcon />
                </IconButton>
            </form>
        )
    }

    return (
        <li>
            <ListItem button component={renderTextField} />
        </li>
    );
}

export default function MenuDrawer() {
    const [open, setOpen] = React.useState(false);

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
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments" onClick={() => { deleteList({ variables: { id: list.id } }) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    ))}
                    <ListTextField onClickCallback={addList} />
                </List>
            </Drawer>
        </div>
    )
}
