import { useState, useEffect } from "react"
import CreateListModal from "./CreateListModal"
import { useList } from '../../contexts/list/useList'
import ModalBase from "../ui/ModalBase"

export default function ListsModal({ isOpen, setIsOpen, otome_id }) {
    
    const [openModal, setOpenModal] = useState(false)

    const { getLists, lists, addToList, deleteFromList } = useList()

    useEffect(() => {
        getLists()
    }, [getLists])

    const handleAddition = async (id, checked) => {
        
        if (checked) {
            await addToList(id, otome_id)
        } else {
            await deleteFromList(id, otome_id)
        }
        getLists()
    }

    return (
        <>
            {isOpen && !openModal &&
                <>
                    <ModalBase
                        handleClose={() => setIsOpen(false)}
                    >
                        {lists?.map(list => (
                            <div key={list._id}>

                                <input
                                    type="checkbox"
                                    id={list._id}
                                    checked={list.otomes.some(otome => otome.id === otome_id)}
                                    onChange={(e) => handleAddition(list._id, e.target.checked)} />

                                <label htmlFor={list._id}>{list.name}</label>
                            </div>
                        ))}
                        <button onClick={() => {
                            setOpenModal(true)
                            setIsOpen(false)
                        }}>Create new list</button>
                    </ModalBase>
                </>
            }
            <CreateListModal isOpen={openModal} setIsOpen={setOpenModal} setShowLists={setIsOpen} />
        </>
    )
}