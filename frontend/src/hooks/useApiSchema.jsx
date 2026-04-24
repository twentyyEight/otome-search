import { useEffect, useState } from "react";
import apiFetchSchema from "../utils/fetching/apiFetchSchema";
import { useParams } from "react-router-dom";

export default function useApiSchema() {

    const [schema, setSchema] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { name } = useParams()

    useEffect(() => {

        async function getProfileData() {

            try {
                const res = await apiFetchSchema()
                setSchema(res)

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        getProfileData(name)

    }, [name])

    return { schema, loading, error }
}