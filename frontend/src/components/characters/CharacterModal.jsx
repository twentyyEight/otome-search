import { useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import descriptionsFormatter from "../../utils/formatters/descriptions.formatter";
import { useAuth } from '../../contexts/auth/useAuth'
import { ListProvider } from "../../contexts/list/ListProvider";
import ListsManager from "../lists/ListsManager";

export default function CharacterModal({ character, open, setOpen }) {

    const { isAuth } = useAuth()

    const [openModal, setOpenModal] = useState(false)

    const handleClose = () => setOpen(false)

    const handleLists = () => {
        setOpenModal(true)
        handleClose()
    }

    const [spoilerLevel, setSpoilerLevel] = useState(0)

    const spoilerColors = {
        0: 'text-black',
        1: 'text-stone-500',
        2: 'text-red-500'
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>

                <DialogContent>

                    <div>
                        <button onClick={() => setSpoilerLevel(0)}>Hide spoilers</button>
                        <button onClick={() => setSpoilerLevel(1)}>Show minor spoilers</button>
                        <button onClick={() => setSpoilerLevel(2)}>Show all spoilers</button>
                    </div>

                    <img src={character.image.url} alt={character.name} />
                    <h4>{character.name}</h4>
                    {character.voice && <p>Voiced by: {character.voice.name}</p>}
                    {character.sex && <p>Sex: {character.sex[0]}</p>}
                    {character.gender && <p>Gender: {character.gender[0]}</p>}

                    <p dangerouslySetInnerHTML={{ __html: descriptionsFormatter(character.description, spoilerLevel) }} />

                    {Object.entries(character.traits).map(([key, values]) => (
                        <div key={crypto.randomUUID()}>
                            <h5>{key}</h5>
                            {values.map(value =>
                                <p
                                    key={crypto.randomUUID()}
                                    className={`${spoilerColors[value.spoiler]} ${spoilerLevel >= value.spoiler ? '' : 'hidden'}`}>
                                    {value.name}
                                </p>
                            )}
                        </div>
                    ))}
                </DialogContent>

                <DialogActions>
                    {isAuth &&
                        <>
                            <button onClick={handleLists}>Add to list</button>
                            <ListProvider type="character">
                                <ListsManager open={openModal} setOpen={setOpenModal} id={character.id} />
                            </ListProvider>
                        </>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}