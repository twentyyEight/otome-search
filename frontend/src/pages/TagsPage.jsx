import useTags from "../hooks/useTags";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Pagination from "../components/Pagination";
import FiltersTags from "../components/TagsPage/FiltersTags";
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useState } from "react";

export default function Tags() {

    const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL
    const page = Number(searchParams.get('page') ?? 1) // Obtiene 'page' del parametro de la URL

    const [filters, setFilters] = useState({
        name: '',
        category: ''
    })

    const { tags, total, loading, error } = useTags(page, filters)

    return <>
        {!error ?
            <>
                {
                    !loading ?
                        <>
                            <FiltersTags setFilters={setFilters} />

                            {tags.map((tag) => (
                                <Link key={tag.id} to={`/tags/${tag.id}`}>{tag.name}</Link>
                            ))}

                            <Pagination page={page} total={total} setSearchParams={setSearchParams} />
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