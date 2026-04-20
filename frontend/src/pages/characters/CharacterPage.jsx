import useCharacter from "../../hooks/characters/useCharacter"
import Loading from "../../components/ui/Loading.jsx"
import Error from "../../components/ui/Error.jsx"
import { Link } from "react-router-dom"

export default function CharacterPage() {

    const { character, loading, error } = useCharacter()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <img src={character.image.url} alt={character.name} />
        <h1>{character.name}</h1>
        {character.vns?.map(otome => <Link key={otome.id} to={`/otomes/${otome.id}`}>{otome.title}</Link>)}
        {character.traits?.map(trait => <p key={trait.id}>{trait.name}</p>)}
    </>
}