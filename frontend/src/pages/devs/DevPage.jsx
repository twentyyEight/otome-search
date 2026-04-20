import useDev from "../../hooks/devs/useDev"
import Error from "../../components/ui/Error"
import Loading from "../../components/ui/Loading"
import OtomesPage from "../otomes/OtomesPage"

export default function DevPage() {

    const { dev, loading, error } = useDev()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <h1>{dev.name}</h1>
        <p>{dev.description}</p>

        <OtomesPage />
    </>
}