import useOtome from "../../hooks/otomes/useOtome.jsx"
import Loading from "../../components/Loading.jsx"
import Error from "../../components/Error.jsx"
import Info from '../../components/OtomePage/Info.jsx'
import Releases from "../../components/OtomePage/Releases.jsx"
import Characters from "../../components/OtomePage/Characters.jsx"

export default function OtomePage() {

    const { otome, loading, error } = useOtome()

    if (loading) return <Loading />
    if (error) return <Error />

    const { info: { va, ...data }, releases, characters } = otome

    return <>
        <Info otome={data} />
        <Releases releases={releases} />
        <Characters characters={characters} otome_id={data.id} vas={va} />
    </>
}