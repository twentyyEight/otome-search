import { useEffect, useState } from "react"
import apiFetch from "../utils/api"
import buildFilters from "../utils/filters/build"

export default function useAllOtomes(page, filters) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [otomes, setOtomes] = useState([])
    const [total, setTotal] = useState(1)
    let { sort } = filters

    const reverse = sort.includes('reverse') ? true : false
    sort = sort.replace("reverse", "")

    useEffect(() => {

        async function fetchAllOtomes() {

            const base = ['and', ["tag", "=", "g542"]]
            const filtros = buildFilters(filters, base)

            try {

                // Queries para la API
                const query = {
                    "filters": filtros,
                    "fields": "title, id, image.url",
                    "results": 100,
                    "page": page,
                    "count": true, // resultados totales
                    "sort": sort,
                    "reverse": reverse
                }

                // LLamada a la API
                const data = await apiFetch('vn', query)

                // Redondea el número de resultados totales al sgte entero superior
                setTotal(Math.ceil(data.count / 100)) // paginas totales

                setOtomes(data.results) // otomes

                setLoading(false)

            } catch (error) {

                setError(error)
                setLoading(false)
            }
        }

        fetchAllOtomes();

    }, [page, sort, reverse, filters])

    return { otomes, total, loading, error }
}