import { useEffect, useState } from "react"
import apiFetch from "../utils/api"
import buildFilters from "../utils/filters/build"

export default function useAllOtomes(page, filters) {

    const [otomes, setOtomes] = useState([])
    const [total, setTotal] = useState(1)
    const { sort, reverse } = filters

    useEffect(() => {

        async function fetchAllOtomes() {

            const filtros = buildFilters(filters)

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
                const data = await apiFetch(query)

                // Redondea el número de resultados totales al sgte entero superior
                setTotal(Math.ceil(data.count / 100)) // paginas totales

                setOtomes(data.results) // otomes

            } catch (error) {
                console.log(error)
            }
        }

        fetchAllOtomes();
    }, [page, sort, reverse, filters])

    return { otomes, total }
}