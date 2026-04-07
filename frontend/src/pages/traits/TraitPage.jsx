import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Link } from "react-router-dom";
import useTrait from "../../hooks/traits/useTrait";
import useCharacters from "../../hooks/characters/useCharacters";
import CharactersList from "../../components/CharactersPage/CharactersList";

export default function TraitPage() {

    const { trait, childTraits, loading, error } = useTrait()
    const { characters, total, loading: loadingCharacters, error: errorCharacters } = useCharacters()

    if (loading || loadingCharacters) return <Loading />
    if (error || errorCharacters) return <Error />

    return <>
        <h1>{trait.name}</h1>
        <p>{trait.description}</p>

        {childTraits.map(trait => (

            <Link key={trait.id} to={`/traits/i${trait.id}`}>{trait.name}</Link>
        ))}

        <CharactersList characters={characters} total={total} />
    </>

}