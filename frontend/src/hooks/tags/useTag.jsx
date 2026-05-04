import { useEffect, useState } from "react";
import { useParams } from "react-router"

export default function useTag() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tag, setTag] = useState([])

    const { id } = useParams()

    useEffect(() => {

        async function fetchTag(id) {

            try {
                const res = await fetch(`http://localhost:3000/api/tags/${id}`)
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)

                setTag(data)
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