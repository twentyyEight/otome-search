import { useList } from '../../contexts/list/useList'
import Lists from './modals/ListsModal'
import { useState } from 'react'

export default function Actions({ st, id }) {

    const { addOtomeState, deleteOtomeState, loading } = useList()

    const [state, setState] = useState(st)
    const [open, setOpen] = useState(false)

    const handleState = (e) => {

        const value = e.target.value

        if (value !== '') addOtomeState({ id: id, state: value })
        else deleteOtomeState(id)
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
            <Lists open={open} setOpen={setOpen} />
        </>
    )
}