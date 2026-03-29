import { useEffect, useState } from "react";
import apiFetch from "../utils/fetching/apiFetch"

export default function useDev(id) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [dev, setDev] = useState(null)

    useEffect(() => {

        async function fetchDev(id) {

            try {

                const query_dev = {
                    "filters": ["id", "=", id],
                    "fields": "name, description, extlinks.url, extlinks.label"
                }

                const res_dev = await apiFetch('producer', query_dev)

                setDev(res_dev.results[0])

            } catch (error) {
                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchDev(id)
    }, [id])

    return { dev, loading, error }

}