import { useEffect, useState } from "react"
import apiFetch from "../utils/fetching/apiFetch"

const ENDPOINT_BY_PREFIX = {
    'g': 'tag',
    'i': 'trait',
    's': 'staff'
}

export default function useSelectionName(ids = []) {

    const [selections, setSelections] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const idsKey = ids.join(',')

    useEffect(() => {

        if (!ids.length) return setSelections([])

        const endpoint = ENDPOINT_BY_PREFIX[ids[0][0]]
        if (!endpoint) return

        setLoading(true)
        setError(false)

        async function fetchNames() {
            try {

                const res = await apiFetch(endpoint, {
                    filters: ids.length === 1
                        ? ['id', '=', ids[0]]
                        : ['or', ...ids.map(id => ['id', '=', id])],
                    fields: 'name',
                })

                const result = []
                res.results.forEach(item => result.push({ id: item.id, name: item.name }))

                setSelections(result)
            } catch (err) {
                setError(true)
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchNames()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idsKey])

    return { selections, loading, error }
}