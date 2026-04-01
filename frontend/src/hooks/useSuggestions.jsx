import { useEffect, useState } from "react";
import dbFetch from '../utils/fetching/dbFetch'

export default function useSuggestions(input = '') {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        
        if (!input || input.trim() === '') {
            setSuggestions([])
            setLoading(false)
            setError(false)
            return
        }

        setLoading(true)
        setError(false)

        async function fetchSuggestions() {
            try {
                const res = await dbFetch('traits/suggestions', { method: 'POST', body: { input } })
                setSuggestions(res)
            } catch (caughtError) {
                setError(true)
                console.error(caughtError)
            } finally {
                setLoading(false)
            }
        }

        fetchSuggestions()

    }, [input])

    return { suggestions, loading, error }
}