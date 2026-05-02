import { useEffect, useState } from "react"
import apiFetchSchema from "../utils/fetching/schemaFetch"

export default function useSchema() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [schema, setSchema] = useState([])

    useEffect(() => {

        async function fetchSchema() {

            try {
                const data = await apiFetchSchema()
                setSchema(data)

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchSchema()

    }, [])

    return { schema, loading, error }
}
