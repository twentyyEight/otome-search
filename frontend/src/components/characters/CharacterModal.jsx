import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth/AuthContext"
import { CharacterContext } from '../../contexts/character/CharacterContext'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ListsModal from '../lists/ListsModal'

export default function CharacterModal({ character, open, setOpen }) {

    const { isAuth } = useContext(AuthContext)
    const { loading, createCharacterList, getCharacterLists, lists, addToCharacterList, deleteFromCharacterList } = useContext(CharacterContext)

    const handleClose = () => setOpen(false)
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <Dialog open={open} onClose={handleClose}>

                <DialogContent>
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
                </DialogContent>

                <DialogActions>
                    {isAuth &&
                        <div onClick={() => setOpenModal(true)}>
                            <button>Add to a List</button>
                        </div>
                    }
                </DialogActions>
            </Dialog>

            <ListsModal
                open={openModal}
                setOpen={setOpenModal}
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