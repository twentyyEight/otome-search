import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useEffect, useContext } from 'react';

import { ListsContext } from '../../contexts/list/ListContext'

export default function ListsModal({ id, view, setView }) {

    const { lists, getLists, addToList, deleteFromList, loading, type } = useContext(ListsContext)

    useEffect(() => {

        if (!view) return

        const fetchLists = async () => {
            await getLists()
        }
        fetchLists()

    }, [view, getLists])

    const handleLists = (value, checked) => {
        if (checked) addToList(value, id)
        else deleteFromList(value, id)
    }

    return (
        <>
            <DialogTitle>Your {type} lists</DialogTitle>

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
                <button onClick={() => setView(false)}>
                    Create list
                </button>
            </DialogActions>
        </>
    )
}