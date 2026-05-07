import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import CreateListModal from "./CreateListModal"
import { useList } from '../../contexts/list/useList'

export default function ListsModal({ isOpen, setIsOpen }) {

    const [openModal, setOpenModal] = useState(false)

    const { getLists, lists, addToList, deleteFromList } = useList()

    const { id } = useParams()
    const otome_id = id

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
                <div>
                    <div>
                        <button onClick={() => setIsOpen(false)}>Close</button>
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
                    </div>
                </div>
            }
            <CreateListModal isOpen={openModal} setIsOpen={setOpenModal} setShowLists={setIsOpen} />
        </>
    )
}