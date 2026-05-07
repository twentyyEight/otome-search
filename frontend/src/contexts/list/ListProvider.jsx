import { useState, useCallback } from "react";
import dbFetch from '../../utils/fetching/dbFetch'
import { ListContext } from "./ListContext";

export function ListProvider({ children }) {

    const [loading, setLoading] = useState(false)
    const [lists, setLists] = useState([])
    const [list, setList] = useState(null)

    const createList = async (name) => {

        setLoading(true)

        try {
            const res = await dbFetch('lists', { method: 'POST', body: name })
            console.log(res)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    const updateList = async (name) => {

        setLoading(true)

        try {
            const res = await dbFetch('lists', { method: 'PUT', body: name })
            console.log(res)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    const deleteList = async (id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`lists/${id}`, { method: 'DELETE' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getLists = useCallback(async () => {

        setLoading(true)

        try {
            const res = await dbFetch('lists')
            setLists(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    const getList = async (id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`lists/${id}`)
            setList(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const addToList = async (id, otome_id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`lists/${id}/otome/${otome_id}`, { method: 'POST' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteFromList = async (id, otome_id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`lists/${id}/otome/${otome_id}`, { method: 'DELETE' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ListContext.Provider value={{
            loading,
            list,
            lists,
            createList,
            updateList,
            deleteList,
            getList,
            getLists,
            addToList,
            deleteFromList
        }}>
            {children}
        </ListContext.Provider>
    )
}