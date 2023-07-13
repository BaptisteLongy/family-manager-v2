import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useQuery, useMutation } from '@apollo/client'
import { ALL_LISTS, DELETE_LIST, ADD_LIST } from '../../requests/lists'
import Link from 'next/link'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

export default function ShoppingListMenu(props) {
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

    if (error) return <p>Erreur :(</p>
    if (loading) return <p>Loading !</p>

    return (
        <List>
            {data.lists.map((list) => (
                    <ListItemButton component={ Link } to={ `/list/${list.id}` } key={list.id} onClick={(e) => { props.onCloseCallback && props.onCloseCallback(false) }}>
                        <ListItemText primary={list.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" onClick={() => { deleteList({ variables: { id: list.id } }) }}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItemButton>
            ))}
            <ListItem>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        addList({ variables: { name: e.target[0].value } });
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
    )
}