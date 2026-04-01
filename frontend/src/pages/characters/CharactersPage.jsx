import useCharacters from "../../hooks/characters/useCharacters"
import Loading from "../../components/Loading.jsx"
import Error from "../../components/Error.jsx"
import { Link } from "react-router-dom"
import Pagination from '../../components/OtomeList/Pagination'
import FiltersCharacters from "../../components/CharactersPage/FiltersCharacters.jsx"

export default function CharactersPage() {

    const { characters, total, loading, error } = useCharacters()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <h1>Characters</h1>

        <FiltersCharacters />

        {characters?.map(character => (

            <div key={character.id}>
                <img src={character.image?.url} alt={character.name} />
                <Link key={character.id} to={`${character.id}`}>{character.name}</Link>
                {character.vns?.map(otome => (
                    <Link key={otome.id} to={`/otomes/${otome.id}`}>{otome.title}</Link>
                ))}
            </div>
        ))}

        {total > 1 && <Pagination total={total} />}
    </>
}