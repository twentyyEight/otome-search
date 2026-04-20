import useTags from "../../hooks/tags/useTags"
import Error from "../../components/ui/Error"
import Loading from "../../components/ui/Loading"
import { Link } from "react-router-dom"
import Pagination from '../../components/ui/Pagination'
import FiltersTags from "../../components/filters/TagsFilters"

export default function TagsPage() {

    const { tags, total, loading, error } = useTags()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <FiltersTags />

        {tags.map(tag => (
            <Link to={`/tags/${tag.id}`} key={tag._id}>{tag.name}</Link>
        ))}

        {total > 1 && <Pagination total={total} />}
    </>
}