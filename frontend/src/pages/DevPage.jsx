import useDev from "../hooks/useDev"
import Error from "../components/Error"
import Loading from "../components/Loading"
import OtomeList from '../components/OtomeList/Base'
import useParamsFilters from "../hooks/useParamsFilters"
import useOtomes from "../hooks/otomes/useOtomes"
import { useParams } from "react-router-dom";

export default function DevPage() {

    const filters = useParamsFilters()
    const { page } = filters
    const { id } = useParams()

    const { dev, loading, error } = useDev(id)
    const { otomes, total, loadingOtome, errorOtome } = useOtomes(page, filters, id)

    if (loading || loadingOtome) return <Loading />
    if (error || errorOtome) return <Error />

    return <>
        <h1>{dev.name}</h1>
        <p>{dev.description}</p>

        <OtomeList otomes={otomes} total={total} />
    </>
}