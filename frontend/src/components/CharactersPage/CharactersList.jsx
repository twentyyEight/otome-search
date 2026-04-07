import { Link } from "react-router-dom"
import Pagination from "../Pagination"

export default function CharactersList({ characters, total }) {

    return (
        <>
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
    )
}