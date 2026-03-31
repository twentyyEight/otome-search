import { useEffect, useState } from "react";
import dbFetch from "../../utils/fetching/dbFetch";

export default function useTagsCategories() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [categories, setCategories] = useState(null)

    useEffect(() => {

        async function fetchCategories() {
            
            try {
                const res = await dbFetch('tags/categories')
                setCategories(res)
            } catch (error) {
                setError(true)
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()

    }, [])

    return { categories, loading, error }
}