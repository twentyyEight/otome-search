import { useContext, useState } from "react"
import { CharacterContext } from '../../contexts/character/CharacterContext'
import { AuthContext } from "../../contexts/auth/AuthContext"
import CharacterModal from "./CharacterModal"
import ListsModal from "../lists/ListsModal"

export default function CharacterCard({ character }) {

    const { loading, createCharacterList, getCharacterLists, lists, addToCharacterList, deleteFromCharacterList } = useContext(CharacterContext)
    const { isAuth } = useContext(AuthContext)

    const [openMoreInfo, setOpenMoreInfo] = useState(false)
    const [openAddToList, setOpenAddToList] = useState(false)

    return (
        <>
            <div>
                {loading && <p>Loading...</p>}

                <img src={character.image.url} alt={character.name} />
                <h4>{character.name}</h4>
                {character.voice && <p>Voiced by: {character.voice.name}</p>}
                {character.sex && <p>Sex: {character.sex[0]}</p>}
                {character.gender && <p>Gender: {character.gender[0]}</p>}

                <button onClick={() => setOpenMoreInfo(true)}>More info.</button>
                {isAuth && <button onClick={() => setOpenAddToList(true)}>Add to a List</button>}
            </div>

            <CharacterModal character={character} open={openMoreInfo} setOpen={setOpenMoreInfo} />
            <ListsModal
                open={openAddToList}
                setOpen={setOpenAddToList}
                context={{ 
                    lists, 
                    getLists: getCharacterLists, 
                    createList: createCharacterList, 
                    loading,
                    addToList: addToCharacterList,
                    deleteFromList: deleteFromCharacterList 
                }}
            />
        </>
    )
}