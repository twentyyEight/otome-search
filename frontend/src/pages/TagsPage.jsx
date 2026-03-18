import useTags from "../hooks/useTags";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";
import FiltersTags from "../components/TagsPage/FiltersTags";
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

export default function TagsPage() {

    const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL
    const page = Number(searchParams.get('page') ?? 1) // Obtiene 'page' del parametro de la URL
    const name = searchParams.get('name') ?? ''
    const category = searchParams.get('category') ?? ''

    const { tags, total, loading, error } = useTags(page, name, category)

    return <>
        {!error ?
            <>
                {
                    !loading ?
                        <>
                            <FiltersTags setSearchParams={setSearchParams} />

                            {tags.map((tag) => (
                                <Link key={tag.id} to={`/tags/${tag.id}`}>{tag.name}</Link>
                            ))}

                            {total > 1 && <Pagination page={page} total={total} setSearchParams={setSearchParams} />}
                        </>
                        :
                        <Loading />
                }
            </>
            :
            <Error />
        }
    </>
}