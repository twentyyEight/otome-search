import { Link } from "react-router-dom"
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useTraits from "../../hooks/traits/useTraits";
import Pagination from '../../components/Pagination'
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
            <Link key={trait._id} to={`i${trait.id}`}>{trait.name}</Link>
        ))}

        {total > 1 && <Pagination total={total} />}
    </>
}