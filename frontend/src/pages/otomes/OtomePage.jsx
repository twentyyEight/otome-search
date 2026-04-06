import useOtome from "../../hooks/otomes/useOtome.jsx"
import Loading from "../../components/Loading.jsx"
import Error from "../../components/Error.jsx"
import Info from '../../components/OtomePage/Info.jsx'
import Releases from "../../components/OtomePage/Releases.jsx"
import Characters from "../../components/OtomePage/Characters.jsx"
import useCharacters from "../../hooks/characters/useCharacters.jsx"

export default function OtomePage() {

    const { otome, error, loading } = useOtome()
    const { characters, loading: charactersLoading, error: charactersError } = useCharacters()

    if (loading || charactersLoading) return <Loading />
    if (error || charactersError) return <Error />

    const chars = characters.map(({ vns, ...character }) => ({
        ...character,
        role: vns.find(vn => vn.id === otome.id).role,
        voice_actor: otome.va.find(va => va.character.id === character.id)?.staff.name,
    }))

    const chars_grouped = chars.reduce((acc, char) => {
        if (!acc[char.role]) acc[char.role] = []
        acc[char.role].push(char)
        return acc
    }, {})

    return <>
        <Info otome={otome} />
        <Releases releases={otome.releases} />
        <Characters characters={chars_grouped} />
    </>
}