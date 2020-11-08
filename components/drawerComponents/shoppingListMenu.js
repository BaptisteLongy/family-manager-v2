import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useQuery, useMutation } from '@apollo/client'
import { ALL_LISTS, DELETE_LIST, ADD_LIST } from '../../requests/lists'
import Link from 'next/link'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

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
                <Link href={`/list/${list.id}`} passHref key={list.id}>
                    <ListItem button component="a" key={list.id} onClick={(e) => { props.onCloseCallback && props.onCloseCallback(false) }}>
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
    )
}