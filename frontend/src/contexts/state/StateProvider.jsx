import { StateContext } from './StateContext'
import dbFetch from '../../utils/fetching/dbFetch'
import { useState } from 'react'

export function StateProvider({ children }) {

    const [loading, setLoading] = useState(false)

    const addState = async (otome) => {
        setLoading(true)
        try {
            const res = await dbFetch('states', { method: 'POST', body: otome })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteState = async (id) => {
        setLoading(true)
        try {
            const res = await dbFetch(`states/${id}`, { method: 'DELETE' })
            console.log(res.message)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <StateContext.Provider value={{ addState, deleteState, loading }}>
            {children}
        </StateContext.Provider>
    )
}