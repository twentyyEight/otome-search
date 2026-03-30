import { useEffect, useState } from "react"
import dbFetch from "../../utils/fetching/dbFetch";
import { useParams } from "react-router-dom";

export default function useTag() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tag, setTag] = useState(null)
    const [childTags, setChildTags] = useState([])

    const { id } = useParams()

    useEffect(() => {

        async function fetchTag() {

            try {

                const res = await dbFetch(`tags/${id}`)

                setTag(res.info)
                setChildTags(res.childTags)

            } catch (error) {
                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTag()

    }, [id])

    return { tag, childTags, loading, error }

}