import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useTag from "../../hooks/tags/useTag"
import useParamsFilters from "../../hooks/useParamsFilters";
import useAllOtomes from "../../hooks/otomes/useOtomes";
import OtomeList from "../../components/OtomeList/Base";
import { useParams } from "react-router-dom";

export default function TagPage() {

    const filters = useParamsFilters()
    const { page } = filters
    const { id } = useParams()

    const { tag, loading, error } = useTag(id)
    const { otomes, total, loadingOtomes, errorOtomes } = useAllOtomes(page, filters, id)

    return <>
        {!error && !errorOtomes ?
            <>
                {!loading && !loadingOtomes ?
                    <>
                        <h1>{tag.name}</h1>
                        <p>{tag.description}</p>

                        <OtomeList
                            otomes={otomes}
                            page={page}
                            total={total} 
                        />
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