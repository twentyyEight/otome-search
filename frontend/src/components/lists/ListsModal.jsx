import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CreateListModal from './CreateListModal'
import { useState, useEffect } from 'react';

export default function ListsModal({ open, setOpen, context, otome_id }) {

    const { lists, getLists, createList, loading, addToList, deleteFromList } = context

    const handleClose = () => setOpen(false)
    const [openCreateModal, setOpenCreateModal] = useState(false)

    useEffect(() => {
        if (open && lists?.length === 0) {
            getLists()
        }
    }, [open, getLists, lists])


    const handleLists = (value, checked) => {
        if (checked) addToList(value, otome_id)
        else deleteFromList(value, otome_id)
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Your Lists</DialogTitle>

                <IconButton onClick={handleClose}>
                    <CloseRoundedIcon />
                </IconButton>

                <DialogContent>
                    {loading && <h1>Loading...</h1>}
                    {lists?.map(list => (
                        <div key={list._id}>
                            <input
                                type="checkbox"
                                id={list._id}
                                value={list._id}
                                onChange={(e) => handleLists(e.target.value, e.target.checked)} />
                            <label htmlFor={list._id}>{list.name}</label>
                        </div>
                    ))}
                </DialogContent>

                <DialogActions>
                    <button onClick={() => setOpenCreateModal(true)}>
                        Create list
                    </button>
                </DialogActions>
            </Dialog>

            <CreateListModal
                open={openCreateModal}
                setOpen={setOpenCreateModal}
                loading={loading}
                createList={createList}
                getLists={getLists} />
        </>
    )
}