import useCharacters from "../../hooks/characters/useCharacters"
import Loading from "../../components/Loading.jsx"
import Error from "../../components/Error.jsx"
import FiltersCharacters from "../../components/CharactersPage/FiltersCharacters.jsx"
import CharactersList from "../../components/CharactersPage/CharactersList.jsx"

export default function CharactersPage() {

    const { characters, total, loading, error } = useCharacters()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <h1>Characters</h1>

        <FiltersCharacters />

        <CharactersList characters={characters} total={total} />
    </>
}