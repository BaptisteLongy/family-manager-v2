import React from 'react';
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { LIST, ADD_ITEM_TO_LIST } from '../../requests/lists'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Item from '../../components/item'
import Grid from '@material-ui/core/Grid';

export default function List({ setMenuTitle }) {
    const router = useRouter()
    const [newItem, setNewItem] = React.useState('')
    const { listid } = router.query

    const { loading, error, data: dataList } = useQuery(LIST, { variables: { id: parseInt(listid) } })
    const [addItemToList, { dataItemAdded }] = useMutation(ADD_ITEM_TO_LIST,
        {
            refetchQueries: [{
                query: LIST,
                variables: { id: parseInt(listid) },
            }],
        });

    const handleChange = (e) => {
        e.preventDefault();
        setNewItem(e.target.value)
    }

    React.useEffect(() => {
        setMenuTitle && dataList && dataList.list && dataList.list.name && setMenuTitle("Liste " + dataList.list.name)
    });

    if (error) return <p>Erreur :(</p>
    if (loading) return <p>Loading !</p>

    return (
        <React.Fragment>
            {dataList.list.items.map(item => {
                return <Item item={item} key={item.id} />
            })}
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addItemToList({ variables: { name: newItem, list_id: parseInt(listid) } });
                    setNewItem('');
                }}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item>
                        <TextField label="A acheter" variant="filled" value={newItem} onChange={handleChange} size="small" />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary" size="large">Ajouter à la liste</Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}