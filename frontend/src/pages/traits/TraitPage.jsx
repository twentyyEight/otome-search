import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import { Link } from "react-router-dom";
import useTrait from "../../hooks/traits/useTrait"
import CharactersPage from "../characters/CharactersPage";

export default function TraitPage() {

    const { trait, childTraits, loading, error } = useTrait()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <h1>{trait.name}</h1>
        <p>{trait.description}</p>

        {childTraits.map(trait => (

            <Link key={trait.id} to={`/traits/i${trait.id}`}>{trait.name}</Link>
        ))}

        <CharactersPage />
    </>

}