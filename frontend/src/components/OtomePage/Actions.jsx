import ListsModal from '../lists/ListsModal'
import { useState } from 'react'
import { useContext } from 'react'
import { StateContext } from '../../contexts/state/StateContext'
import { OtomeContext } from '../../contexts/otome/OtomeContext'

export default function Actions({ st, id }) {

    const { addState, deleteState, loading } = useContext(StateContext)
    const { createOtomeList, getOtomeLists, lists, loading: otome_loading, addToOtomeList, deleteFromOtomeList } = useContext(OtomeContext)

    const [state, setState] = useState(st)
    const [open, setOpen] = useState(false)

    const handleState = (e) => {

        const value = e.target.value

        if (value !== '') addState({ id: id, state: value })
        else deleteState(id)
        setState(value)
    }

    return (
        <>
            {loading && <p>Loading...</p>}

            <label htmlFor="state">State</label>

            <select
                id='state'
                value={state}
                onChange={handleState}>

                <option value="">No state</option>
                <option value={0}>Playing</option>
                <option value={1}>Finished</option>
                <option value={2}>On Hold</option>
                <option value={3}>Dropped</option>
                <option value={4}>Plan to play</option>
            </select>

            <button onClick={() => setOpen(true)}>Add to a list</button>
            <ListsModal
                open={open}
                setOpen={setOpen}
                otome_id={id}
                context={{ 
                    lists, 
                    getLists: getOtomeLists, 
                    createList: createOtomeList, 
                    loading: otome_loading,
                    addToList: addToOtomeList,
                    deleteFromList: deleteFromOtomeList
                }}
            />
        </>
    )
}