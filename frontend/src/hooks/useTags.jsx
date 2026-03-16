import apiFetch from "../utils/api.js"
import { useEffect, useState } from "react"

export default function useTags(page, filters) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tags, setTags] = useState(null)
    const [total, setTotal] = useState(1)

    useEffect(() => {

        async function fetchTags() {
            
            try {

                let name = filters.name
                let category = filters.category

                let filtros = ["and", ["category", "!=", "ero"], ['search', '=', name]]

                if (category != '') filtros.push(['category', '=', category])
                else filtros.pop()

                const query = {
                    "filters": filtros,
                    "fields": "name",
                    "results": 100,
                    "sort": "name",
                    "page": page,
                    "count": true
                }
                
                const res = await apiFetch('tag', query)

                setTags(res.results)
                setTotal(res.count)

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTags()
    }, [page, filters])

    return { tags, total, loading, error }
}