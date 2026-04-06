import { useAuth } from "../../contexts/auth/useAuth"
import { useList } from '../../contexts/list/useList'

export default function Characters({ characters }) {

    const { isAuth } = useAuth()
    const { addCharacter } = useList()

    const characters_roles = [
        { key: 'main', label: 'Protagonista(s)' },
        { key: 'primary', label: 'Principales' },
        { key: 'side', label: 'Secundarios' },
        { key: 'appears', label: 'Terciarios' },
    ]

    const onSubmitCharacters = (id) => addCharacter(id)

    return <>
        <h2>Personajes</h2>
        {characters_roles.map(({ key, label }) => (

            characters[key] &&

            <div key={key}>

                <h3>{label}</h3>
                {characters[key].map(char => (

                    <div key={char.id}>
                        <img src={char.image?.url} alt={char.name} />
                        <h4>{char.name}</h4>

                        {isAuth &&
                            <button onClick={() => onSubmitCharacters(char.id)}>
                                Agregar a favoritos
                            </button>
                        }

                        <p>{char.voice_actor && 'Actor de voz: ' + char.voice_actor}</p>
                        <p>Sexo: {char.sex[0]}</p>

                        {char.traits.map(trait => <p key={trait.id}>{trait.name}</p>)}

                        <p>{char.description}</p>
                    </div>
                ))}

            </div>
        ))}
    </>
}