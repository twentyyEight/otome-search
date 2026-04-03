import { useEffect, useState } from "react"
import dbFetch from '../../utils/fetching/dbFetch'
import useDevsParams from "./useDevsParams"

export default function useTags() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [devs, setDevs] = useState([])
    const [total, setTotal] = useState(0)

    const url = useDevsParams()

    useEffect(() => {

        async function fetchTags() {

            try {
                const res = await dbFetch(url)

                setDevs(res.devs)
                setTotal(Math.ceil(res.total / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTags()

    }, [url])

    return { devs, total, loading, error }
}