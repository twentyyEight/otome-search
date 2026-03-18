import Loading from "../components/Loading";
import Error from "../components/Error";
import useTag from "../hooks/useTag";
import { Link } from 'react-router-dom'
import FiltersOtomes from "../components/OtomeList/FiltersOtomes";
import Pagination from "../components/Pagination";
import { useSearchParams } from 'react-router-dom'
import useParamsFilters from "../hooks/useParamsFilters";

export default function TagPage() {

    const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL
    const filters = useParamsFilters(searchParams)
    const { page } = filters

    const { tag, otomes, total, loading, error } = useTag(page, filters)

    return <>
        {!error ?
            <>
                {!loading ?
                    <>
                        <h1>{tag.name}</h1>
                        <p>{tag.description}</p>

                        <FiltersOtomes setSearchParams={setSearchParams} searchParams={searchParams} />

                        <h2>Otomes con este tag:</h2>
                        {otomes.map((otome) => (
                            <Link key={otome.id} to={`/otomes/${otome.id}`}>
                                <img src={otome.image?.url} alt={otome.title} />
                                <h3>{otome.title}</h3>
                            </Link>
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