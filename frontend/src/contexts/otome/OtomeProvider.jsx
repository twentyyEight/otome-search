import { OtomeContext } from "./OtomeContext";
import dbFetch from "../../utils/fetching/dbFetch";
import { useState } from "react";

export function OtomeProvider({ children }) {

    const [loading, setLoading] = useState(false)
    const [lists, setLists] = useState([])

    const createOtomeList = async (name) => {
        setLoading(true)

        try {
            const res = await dbFetch('otomes/lists', { method: 'POST', body: name })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteOtomeList = async (id) => {
        setLoading(true)

        try {
            const res = await dbFetch(`otomes/lists/${id}`)
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
            setLists(res)
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

    const deleteFromOtomeList = async (id, otome_id) => {
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
        <OtomeContext.Provider
            value={{
                loading,
                createOtomeList,
                deleteOtomeList,
                getOtomeLists,
                addToOtomeList,
                deleteFromOtomeList,
                lists
            }}>
            {children}
        </OtomeContext.Provider>
    )
}