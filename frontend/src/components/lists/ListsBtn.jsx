import { useState } from 'react'
import ListsModal from './ListsModal'
import CreateListModal from './CreateListModal'

export default function ListsBtn({ id, theme }) {

    const [openListsModal, setOpenListsModal] = useState(false)
    const [openCreateModal, setOpenCreateModal] = useState(false)

    const handleCreateList = () => {
        setOpenListsModal(false)
        setOpenCreateModal(true)
    }

    const handleBackToLists = () => {
        setOpenCreateModal(false)
        setOpenListsModal(true)
    }

    return (
        <>
        <button onClick={() => setOpenListsModal(true)}>Add to list</button>

        <ListsModal 
            open={openListsModal} 
            setOpen={setOpenListsModal}
            id={id}
            theme={theme}
            handleCreateList={handleCreateList} />

        <CreateListModal
            open={openCreateModal}
            setOpen={setOpenCreateModal}
            setOpenLists={handleBackToLists} />
        </>
    )
}