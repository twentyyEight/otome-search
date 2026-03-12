import useOtome from "../hooks/useOtome"
import Loading from "../components/Loading"
import Error from "../components/Error"
import Info from '../components/OtomeDetail/Info.jsx'
import Releases from "../components/OtomeDetail/Releases.jsx"
import Characters from "../components/OtomeDetail/Characters.jsx"

export default function OtomeDetail() {

    const { otome, error, loading } = useOtome()

    return (
        !error ?
            <>
                {!loading ?
                    <>
                        <Info otome={otome} />
                        <Releases releases={otome.releases} />
                        <Characters characters={otome.characters} />
                    </>
                    :
                    <Loading />
                }
            </>
            :
            <Error />
    )
}