import { useEffect, useState } from "react"
import apiFetch from "../../utils/api.js";

export default function useTag(id) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tag, setTag] = useState(null)

    useEffect(() => {

        async function fetchTag(id) {

            try {

                const query_tag = {
                    "filters": ['id', '=', id],
                    "fields": "name, description"
                }

                const res_tag = await apiFetch('tag', query_tag)

                setTag(res_tag.results[0])

            } catch (error) {
                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTag(id)

    }, [id])

    return { tag, loading, error }

}