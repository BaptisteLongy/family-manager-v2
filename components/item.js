import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client'
import { LIST, DELETE_ITEM } from '../requests/lists'

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
        <div>
            <span>{item.name}</span>
            <IconButton aria-label="delete" onClick={() => { deleteItem({variables: { id: item.id}})}}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}