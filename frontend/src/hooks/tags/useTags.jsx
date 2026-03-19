import apiFetch from "../../utils/api.js"
import { useEffect, useState } from "react"

export default function useTags(page, name, category) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tags, setTags] = useState(null)
    const [total, setTotal] = useState(1)

    useEffect(() => {

        async function fetchTags() {
            
            try {

                let filters = ["and", ["category", "!=", "ero"], ['search', '=', name]]

                if (category != '') filters.push(['category', '=', category])

                const query = {
                    "filters": filters,
                    "fields": "name",
                    "results": 100,
                    "sort": "name",
                    "page": page,
                    "count": true
                }
                
                const res = await apiFetch('tag', query)

                setTags(res.results)
                setTotal(Math.ceil(res.count / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTags()
    }, [page, name, category])

    return { tags, total, loading, error }
}