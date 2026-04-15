import { useState, useCallback } from "react";
import { ListsContext } from "./ListContext";
import dbFetch from "../../utils/fetching/dbFetch";

export function ListProvider({ children, type }) {

    const [loading, setLoading] = useState(false)
    const [lists, setLists] = useState([])

    const path = `${type}s/lists`

    const createList = async (name) => {
        setLoading(true)
        try {
            const res = await dbFetch(path, { method: 'POST', body: name })
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
            const res = await dbFetch(`${path}/${id}`, { method: 'DELETE' })
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
            const res = await dbFetch(path)
            setLists(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [path])

    const addToList = useCallback(async (id, item_id) => {
        setLoading(true)
        try {
            const res = await dbFetch(`${path}/${id}/${type}/${item_id}`, { method: 'POST' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [path, type])

    const deleteFromList = useCallback(async (id, item_id) => {
        setLoading(true)
        try {
            const res = await dbFetch(`${path}/${id}/${type}/${item_id}`, { method: 'DELETE' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [path, type])

    return (
        <ListsContext.Provider value={{
            loading,
            lists,
            type,
            createList,
            deleteList,
            getLists,
            addToList,
            deleteFromList
        }}>
            {children}
        </ListsContext.Provider>
    )
}
