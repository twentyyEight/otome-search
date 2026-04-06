import useTags from "../../hooks/tags/useTags"
import Error from "../../components/Error"
import Loading from "../../components/Loading"
import { Link } from "react-router-dom"
import Pagination from '../../components/Pagination'
import FiltersTags from "../../components/TagsPage/FiltersTags"

export default function TagsPage() {

    const { tags, total, loading, error } = useTags()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <FiltersTags />

        {tags.map(tag => (
            <Link to={`/tags/g${tag.id}`} key={tag._id}>{tag.name}</Link>
        ))}

        {total > 1 && <Pagination total={total} />}
    </>
}