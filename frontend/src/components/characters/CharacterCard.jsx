import { useState } from "react"

import ListsManager from "../lists/ListsManager"
import CharacterModal from '../characters/CharacterModal'

import { ListProvider } from "../../contexts/list/ListProvider"
import { useAuth } from '../../contexts/auth/useAuth'

export default function CharacterCard({ character, extra }) {

    const { isAuth } = useAuth()

    const [openCharacterModal, setOpenCharacterModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div>
                <img src={character.image.url} alt={character.name} />
                <h4>{character.name}</h4>

                {extra && extra}

                <button onClick={() => setOpenCharacterModal(true)}>More info.</button>

                <CharacterModal
                    character={character}
                    open={openCharacterModal}
                    setOpen={setOpenCharacterModal} />

                {isAuth &&
                    <>
                        <button onClick={() => setOpenModal(true)}>Add to list</button>
                        <ListProvider type="character">
                            <ListsManager open={openModal} setOpen={setOpenModal} id={character.id} />
                        </ListProvider>
                    </>
                }
            </div>

        </>
    )
}