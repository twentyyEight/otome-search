import useOtome from "../../hooks/otomes/useOtome.jsx"
import Loading from "../../components/Loading.jsx"
import Error from "../../components/Error.jsx"
import Info from '../../components/OtomeDetail/Info.jsx'
import Releases from "../../components/OtomeDetail/Releases.jsx"
import Characters from "../../components/OtomeDetail/Characters.jsx"

export default function OtomePage() {

    const { otome, error, loading } = useOtome()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <Info otome={otome} />
        <Releases releases={otome.releases} />
        <Characters characters={otome.characters} />
    </>
}