import { useEffect, useState } from "react";
import { useParams } from "react-router"
import dbFetch from "../../utils/fetching/dbFetch";

export default function useTag() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tag, setTag] = useState([])

    const { id } = useParams()

    useEffect(() => {

        async function fetchTag(id) {

            try {
                const res = await dbFetch(`tags/${id}`)
                setTag(res)
            } catch (err) {
                setError(true)
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTag(id)

    }, [id])

    return { tag, error, loading }
}