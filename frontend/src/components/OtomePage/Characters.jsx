import charactersFormarter from "../../utils/characters.formatter.js"
import CharacterCard from '../characters/CharacterCard.jsx'

export default function Characters({ characters, otome_id, vas }) {

    const characters_roles = [
        { key: 'main', label: 'Protagonist(s)' },
        { key: 'primary', label: 'Main Character(s)' },
        { key: 'side', label: 'Side Character(s)' },
        { key: 'appears', label: 'Make an appearance' },
    ]

    const characters_ordered = charactersFormarter(characters, otome_id, vas)

    return <>
        <h2>Characters</h2>
        {characters_roles.map(({ key, label }) => (

            characters_ordered[key] &&

            <div key={key}>

                <h3>{label}</h3>

                {characters_ordered[key].map(character => <CharacterCard key={character.id} character={character} />)}
            </div>
        ))}
    </>
}