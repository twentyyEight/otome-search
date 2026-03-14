import { useAuth } from "../contexts/auth/useAuth"
import useProfile from "../hooks/useProfile"
import Error from "../components/Error"
import Loading from "../components/Loading"
import { Link } from 'react-router-dom'

export default function Profile() {

    const { userId } = useAuth()
    const { profileData, loading, error } = useProfile(userId)
    const { name, collections, characters } = profileData

    const collections_state = [
        { key: 0, label: 'Jugando' },
        { key: 1, label: 'Completados' },
        { key: 2, label: 'En pausa' },
        { key: 3, label: 'Abandonados' },
    ]

    return <>
        {!error ?
            <>
                {!loading ?
                    <>
                        <h1>Perfil de {name}</h1>

                        <h2>Personajes favortios</h2>
                        {characters.map(character => (

                            <div key={character.id}>
                                <img src={character.img} alt={character.name} />
                                <p>{character.name}</p>
                            </div>
                        ))}

                        {collections_state.map(({ key, label }) => (

                            collections[key] &&

                            <div key={key}>

                                <h2>Otomes {label}</h2>
                                {collections[key].map(collection => (

                                    <Link to={`/otomes/${collection.otome_id}`} key={collection._id}>
                                        <div>
                                            <img src={collection.otome_img} alt={collection.otome_title} />
                                            <h3>{collection.otome_title}</h3>
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        ))}
                    </>
                    :
                    <Loading />
                }
            </>
            :
            <Error />
        }
    </>
}