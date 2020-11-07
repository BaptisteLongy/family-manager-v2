import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { LIST } from '../../requests/lists'

export default function List() {
    const router = useRouter()
    const { listid } = router.query

    const { loading, error, data } = useQuery(LIST, { variables: {id: parseInt(listid)} })

    if (error) return <p>Erreur :(</p>
    if (loading) return <p>Loading !</p>

    return (
        <div>
            <h1>La liste {data.list.name}</h1>
            {data.list.items.map(item => {
                return <p>{item.name}</p>
            })}
        </div>
    )
}