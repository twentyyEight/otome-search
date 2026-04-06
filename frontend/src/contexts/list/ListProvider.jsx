import { ListContext } from './ListContext'
import dbFetch from '../../utils/fetching/dbFetch'
import { useState } from 'react'

export function ListProvider({ children }) {

    const [loading, setLoading] = useState(false)

    const addOtomeState = async (otome) => {
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

    const deleteOtomeState = async (id) => {
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

    const addCharacter = async (character) => {
        setLoading(true)
        try {
            const res = await dbFetch('characters', { method: 'POST', body: character })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ListContext.Provider value={{ addOtomeState, addCharacter, deleteOtomeState, loading }}>
            {children}
        </ListContext.Provider>
    )
}