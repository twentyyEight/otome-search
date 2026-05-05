import { useEffect, useState } from "react";
import dbFetch from '../utils/fetching/dbFetch'

export default function useSuggestions(input = '') {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {

    }, [input])


    useEffect(() => {

        async function fetchSuggestions() {

            if (!input || input.trim() === '') {
                setSuggestions([])
                return
            }

            setLoading(true)

            try {
                const res = await dbFetch(`tags/suggestions`, { method: 'POST', body: { name: input } })
                setSuggestions(res)
            } catch (error) {
                setError(true)
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchSuggestions()

    }, [input])

    return { suggestions, loading, error }
}