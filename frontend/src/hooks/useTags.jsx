import { useEffect, useState } from "react";

export default function useTags() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tags, setTags] = useState([])

    useEffect(() => {

        async function fetchTags() {

            try {
                const res = await fetch('http://localhost:3000/api/tags')
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)

                setTags(data)
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