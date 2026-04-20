import { Link } from "react-router-dom"
import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import useTraits from "../../hooks/traits/useTraits";
import Pagination from '../../components/ui/Pagination'
import { useSearchParams } from 'react-router-dom'

export default function TraitsPage() {

    const [_, setSearchParams] = useSearchParams()
    const { traits, total, loading, error } = useTraits()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <input
            type="text"
            placeholder="Search trait by name..."
            onChange={(e) => setSearchParams({ name: e.target.value })} />

        {traits.map(trait => (
            <>
                <Link key={trait.id} to={`${trait.id}`}>{trait.name}</Link>
                <Link key={crypto.randomUUID()} to={`${trait.group_id}`}>{(trait.group_name)}</Link>
            </>
        ))}

        {total > 1 && <Pagination total={total} />}
    </>
}