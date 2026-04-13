import { useState } from "react"
import CharacterModal from "./CharacterModal"
import ListsBtn from "../lists/ListsBtn"
import { ListProvider } from "../../contexts/list/ListProvider"
import { useAuth } from '../../contexts/auth/useAuth'

export default function CharacterCard({ character }) {

    const { isAuth } = useAuth()

    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div>
                <img src={character.image.url} alt={character.name} />
                <h4>{character.name}</h4>
                {character.voice && <p>Voiced by: {character.voice.name}</p>}
                {<p>Role: {character.role}</p>}

                <button onClick={() => setOpenModal(true)}>More info.</button>

                {isAuth &&
                    <ListProvider type="character">
                        <ListsBtn id={character.id} />
                    </ListProvider>
                }
            </div>

            <CharacterModal character={character} open={openModal} setOpen={setOpenModal} />
        </>
    )
}