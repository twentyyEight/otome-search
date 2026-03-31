import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Link } from "react-router-dom";
import useTrait from "../../hooks/traits/useTrait";

export default function TraitPage() {

    const { trait, childTraits, characters, loading, error } = useTrait()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <h1>{trait.name}</h1>
        <p>{trait.description}</p>

        {childTraits.map(trait => (

            <Link key={trait._id} to={`/traits/i${trait.id}`}>{trait.name}</Link>
        ))}

        {characters?.map(character => (

            <div key={character.id}>
                <img src={character.image.url} alt={character.name} />
                <p>{character.name}</p>
                {character.vns.map(otome => (
                    <Link key={otome.id} to={`/otomes/${otome.id}`}>{otome.title}</Link>
                ))}
            </div>
        ))}
    </>

}