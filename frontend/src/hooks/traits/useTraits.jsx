import { useEffect, useState } from "react";
import dbFetch from '../../utils/fetching/dbFetch'
import useTraitsParams from "./useTraitsParams";

export default function useTraits() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [traits, setTraits] = useState([])
    const [total, setTotal] = useState(1)

    const url = useTraitsParams()

    useEffect(() => {

        async function fetchTraits() {

            try {
                const res = await dbFetch(url)

                console.log(res)

                setTraits(res.traits)
                setTotal(Math.ceil(res.total / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTraits()
    }, [url])

    return { traits, total, loading, error }
}