import { useRouter } from 'next/router'

export default function List() {
    const router = useRouter()
    const { listid } = router.query
    return(
        <div>
            <h1>La liste {listid}</h1>
        </div>
    )
}