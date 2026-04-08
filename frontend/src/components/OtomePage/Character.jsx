import { useContext } from "react"
import { CharacterContext } from '../../contexts/character/CharacterContext'
import { AuthContext } from "../../contexts/auth/AuthContext"
import { useState } from "react"

export default function Character({ character }) {

    const { addCharacter, deleteCharacter, favorites, loading } = useContext(CharacterContext)
    const { isAuth } = useContext(AuthContext)
    
    const [isFavorite, setIsFavorite] = useState(favorites.includes(character.id))

    const handleAddFavorite = async () => {
        const res = await addCharacter(character.id)
        if (res) setIsFavorite(true)
    }

    const handleDeleteFavorite = async () => {
        const res = deleteCharacter(character.id)
        if (res) setIsFavorite(false)
    }

    return (
        <div>
            {loading && <p>Loading...</p>}

            {isAuth &&
                <>
                    {isFavorite ?
                        <button onClick={handleDeleteFavorite}>Delete from Favorites</button>
                        :
                        <button onClick={handleAddFavorite}>Add to Favorites</button>
                    }
                </>
            }

            <img src={character.image.url} alt={character.name} />
            <h4>{character.name}</h4>
            {character.voice && <p>Voiced by: {character.voice.name}</p>}
            {character.sex && <p>Sex: {character.sex[0]}</p>}
            {character.gender && <p>Gender: {character.gender[0]}</p>}
            <p>{character.description}</p>

            {Object.entries(character.traits).map(([key, values]) => (
                <div key={crypto.randomUUID()}>
                    <h5>{key}</h5>
                    {values.map(value =>
                        <p key={crypto.randomUUID()}>{value.name}</p>
                    )}
                </div>
            ))}
        </div>
    )
}