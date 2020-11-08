import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client'
import { LIST, DELETE_ITEM } from '../requests/lists'
import Grid from '@material-ui/core/Grid';

export default function Item(props) {
    const { item } = props

    const [deleteItem, { dataDeletedItem }] = useMutation(DELETE_ITEM,
        {
            refetchQueries: [{
                query: LIST,
                variables: { id: parseInt(item.list_id) },
            }],
        });

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <span>{item.name}</span>
            </Grid>
            <Grid item>
                <IconButton aria-label="delete" onClick={() => { deleteItem({ variables: { id: item.id } }) }}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    )
}