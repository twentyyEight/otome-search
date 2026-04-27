import { Link } from "react-router-dom";
import Loading from '../components/Loading'
import Error from '../components/Error'
import Pagination from '../components/Pagination'
import useOtomes from '../hooks/otomes/useOtomes'
import useSchema from "../hooks/useSchema";
import FiltersOtomes from "../components/filters/FiltersOtomes";

export default function OtomesPage() {

    const { otomes, total, loading: loading_otome, error: error_otome } = useOtomes()
    const { schema, loading: loading_schema, error: error_schema } = useSchema()

    if (loading_otome || loading_schema) return <Loading />
    if (error_otome || error_schema) return <Error />

    return (
        <>
            <FiltersOtomes schema={schema} />

            {otomes.map((otome) => (
                <Link key={otome.id} to={`/otomes/${otome.id}`}>
                    <img src={otome.image?.url} alt={otome.title} />
                    <p>{otome.title}</p>
                </Link>
            ))}

            {total > 1 && <Pagination total={total} />}
        </>
    )
}