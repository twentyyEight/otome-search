import useDevs from '../../hooks/devs/useDevs'
import Error from '../../components/ui/Error'
import Loading from '../../components/ui/Loading'
import { Link } from "react-router-dom"
import Pagination from '../../components/ui/Pagination'

export default function DevsPage() {

    const { devs, total, loading, error } = useDevs()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        {devs?.map(dev => <Link key={dev.id} to={dev.id}>{dev.name}</Link>)}

        {total > 1 && <Pagination total={total} />}
    </>
}