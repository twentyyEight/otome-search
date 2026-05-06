import { useState } from "react";
import dbFetch from '../../utils/fetching/dbFetch'
import { OtomeListContext } from "./OtomeListContext";

export function OtomeListProvider({ children }) {

    const [loading, setLoading] = useState(false)
    const [otomeLists, setOtomeLists] = useState([])
    const [otomeList, setOtomeList] = useState(null)

    const createOtomeList = async (name) => {

        setLoading(true)

        try {
            const res = await dbFetch('otomes/lists', { method: 'POST', body: name })
            console.log(res)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    const updateOtomeList = async (name) => {

        setLoading(true)

        try {
            const res = await dbFetch('otomes/lists', { method: 'PUT', body: name })
            console.log(res)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    const deleteOtomeList = async (id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`otomes/lists/${id}`, { method: 'DELETE' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getOtomeLists = async () => {

        setLoading(true)

        try {
            const res = await dbFetch('otomes/lists')
            setOtomeLists(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getOtomeList = async (id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`otomes/lists/${id}`)
            setOtomeList(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const addToOtomeList = async (id, otome_id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`otomes/lists/${id}/otome/${otome_id}`, { method: 'POST' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteToOtomeList = async (id, otome_id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`otomes/lists/${id}/otome/${otome_id}`, { method: 'DELETE' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <OtomeListContext.Provider value={{
            loading,
            otomeList,
            otomeLists,
            createOtomeList,
            updateOtomeList,
            deleteOtomeList,
            getOtomeList,
            getOtomeLists,
            addToOtomeList,
            deleteToOtomeList
        }}>
            {children}
        </OtomeListContext.Provider>
    )
}