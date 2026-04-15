import { useState, useContext } from 'react'

import { StateContext } from '../../contexts/state/StateContext'
import { ListProvider } from '../../contexts/list/ListProvider'

import ListsManager from '../lists/ListsManager'

export default function Actions({ st, id }) {

    const { addState, deleteState, loading } = useContext(StateContext)

    const [state, setState] = useState(st)
    const [openModal, setOpenModal] = useState(false)

    const handleState = (e) => {

        const value = e.target.value

        if (value !== '') addState(id, value)
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

            <button onClick={() => setOpenModal(true)}>Add to list</button>

            <ListProvider type="otome">
                <ListsManager open={openModal} setOpen={setOpenModal} id={id} />
            </ListProvider>
        </>
    )
}