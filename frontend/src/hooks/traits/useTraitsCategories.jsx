import { useEffect, useState } from "react";
import dbFetch from '../../utils/fetching/dbFetch'

export default function useTraitsCategories() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [categories, setCategories] = useState([])

    useEffect(() => {

        async function fetchTraitsCategories() {
            
            try {
                const res = await dbFetch('traits/categories')
                setCategories(res)
            } catch (error) {
                setError(true)
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchTraitsCategories()

    }, [])

    return { categories, loading, error }
}