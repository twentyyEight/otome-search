import { useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ListsModal from '../lists/ListsModal'
import descriptionsFormatter from "../../utils/fetching/descriptions.formatter";
import { useAuth } from '../../contexts/auth/useAuth'

export default function CharacterModal({ character, open, setOpen }) {

    const { isAuth } = useAuth()

    const handleClose = () => setOpen(false)
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <Dialog open={open} onClose={handleClose}>

                <DialogContent>

                    <div>
                        <button>Hide spoilers</button>
                        <button>Show minor spoilers</button>
                        <button>Show all spoilers</button>
                    </div>

                    <img src={character.image.url} alt={character.name} />
                    <h4>{character.name}</h4>
                    {character.voice && <p>Voiced by: {character.voice.name}</p>}
                    {character.sex && <p>Sex: {character.sex[0]}</p>}
                    {character.gender && <p>Gender: {character.gender[0]}</p>}

                    <p dangerouslySetInnerHTML={{ __html: descriptionsFormatter(character.description) }} />

                    {Object.entries(character.traits).map(([key, values]) => (
                        <div key={crypto.randomUUID()}>
                            <h5>{key}</h5>
                            {values.map(value =>
                                <p key={crypto.randomUUID()} className={`${value.spoiler}`}>{value.name}</p>
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
        </>
    )
}