import useDev from "../../hooks/devs/useDev"
import Error from "../../components/Error"
import Loading from "../../components/Loading"
import OtomeList from '../../components/OtomesPage/Base'
import useOtomes from "../../hooks/otomes/useOtomes"

export default function DevPage() {

    const { dev, loading, error } = useDev()
    const { otomes, total, loadingOtome, errorOtome } = useOtomes()

    if (loading || loadingOtome) return <Loading />
    if (error || errorOtome) return <Error />

    return <>
        <h1>{dev.name}</h1>
        <p>{dev.description}</p>

        <OtomeList otomes={otomes} total={total} />
    </>
}