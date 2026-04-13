import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useEffect, useContext } from 'react';
import { ListsContext } from '../../contexts/list/ListContext'

export default function ListsModal({ open, setOpen, id, handleCreateList }) {

    const { lists, getLists, addToList, deleteFromList, loading, type } = useContext(ListsContext)

    const handleClose = () => setOpen(false)

    useEffect(() => {

        if (!open) return

        const fetchLists = async () => {
            await getLists()
        }
        fetchLists()

    }, [open, getLists])


    const handleLists = (value, checked) => {
        if (checked) addToList(value, id)
        else deleteFromList(value, id)
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Your {type} lists</DialogTitle>

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
                                checked={list[`${type}s`]?.some(item => item.id === id)}
                                value={list._id}
                                onChange={(e) => handleLists(e.target.value, e.target.checked)} 
                            />

                            <label htmlFor={list._id}>{list.name}</label>
                        </div>
                    ))}
                </DialogContent>

                <DialogActions>
                    <button onClick={handleCreateList}>
                        Create list
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}