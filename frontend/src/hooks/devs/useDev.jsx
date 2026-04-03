import { useEffect, useState } from "react";
import apiFetch from "../../utils/fetching/apiFetch"
import { useParams } from "react-router-dom";

export default function useDev() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [dev, setDev] = useState(null)

    const { id } = useParams()

    useEffect(() => {

        async function fetchDev() {

            try {

                const query = {
                    "filters": ["id", "=", id],
                    "fields": "name, description, extlinks.url, extlinks.label"
                }

                const res = await apiFetch('producer', query)

                setDev(res.results[0])

            } catch (error) {
                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchDev()
    }, [id])

    return { dev, loading, error }

}