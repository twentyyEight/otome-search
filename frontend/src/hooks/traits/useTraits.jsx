import { useEffect, useState } from "react";
import apiFetch from '../../utils/fetching/apiFetch'
import useTraitsParams from "./useTraitsParams";

export default function useTraits() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [traits, setTraits] = useState([])
    const [total, setTotal] = useState(1)

    const query = useTraitsParams()

    useEffect(() => {

        async function fetchTraits() {

            try {
                const res = await apiFetch('trait', query)

                setTraits(res.results)
                setTotal(Math.ceil(res.count / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTraits()
    }, [query])

    return { traits, total, loading, error }
}