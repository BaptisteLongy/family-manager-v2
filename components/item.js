import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client'
import { LIST, DELETE_ITEM } from '../requests/lists'
import Grid from '@mui/material/Grid';

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
            justifyContent="center"
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