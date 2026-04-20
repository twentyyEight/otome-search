import useProfile from "../../hooks/useProfile"
import Error from "../../components/ui/Error"
import Loading from "../../components/ui/Loading"
import { Link } from 'react-router-dom'

export default function Profile() {

    const { profile, loading, error } = useProfile()

    if (loading) return <Loading />
    if (error) return <Error />

    const { name, otomes, characters } = profile

    const states = ['Playing', 'Finished', 'Wishlist', 'Stalled', 'Dropped']

    return <>
        <h1>{name}'s profile</h1>

        <h2>Personajes favortios</h2>
        {characters.map(character => (

            <div key={character.id}>
                <img src={character.img} alt={character.name} />
                <p>{character.name}</p>
            </div>
        ))}

        {states.map(state => (

            <div key={state}>

                <h2>{state}</h2>

                {otomes[state.toLowerCase()].map(otome => (
                    
                    <div key={otome._id}>
                        <img src={otome.img} alt={otome.title} />
                        <Link to={`/otomes/${otome.id}`}>{otome.title}</Link>
                    </div>
                ))}
            </div>
        ))}
    </>
}