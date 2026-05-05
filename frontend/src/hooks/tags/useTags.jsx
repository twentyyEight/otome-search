import { useEffect, useState } from "react";
import dbFetch from "../../utils/fetching/dbFetch";

export default function useTags() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tags, setTags] = useState([])

    useEffect(() => {

        async function fetchTags() {

            try {
                const res = await dbFetch(`tags`)
                setTags(res)
            } catch (err) {
                setError(true)
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTags()

    }, [])

    return { tags, error, loading }

}