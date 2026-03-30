import { useEffect, useState } from "react"
import apiFetch from "../../utils/fetching/apiFetch"
import buildFilters from "../../utils/filters/build"
import useParamsFilters from "../../hooks/useParamsFilters";

export default function useOtomes(id) {

    const [loadingOtomes, setLoadingOtomes] = useState(true)
    const [errorOtomes, setErrorOtomes] = useState(null)

    const [otomes, setOtomes] = useState([])
    const [total, setTotal] = useState(1)

    const filters = useParamsFilters()
    let { page, sort } = filters

    const reverse = sort.includes('reverse') ? true : false
    sort = sort.replace("reverse", "")

    useEffect(() => {

        async function fetchAllOtomes() {

            try {

                const filtros = buildFilters(filters, id)

                // Queries para la API
                const query = {
                    "filters": filtros,
                    "fields": "title, image.url",
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

            } catch (error) {

                setErrorOtomes(error)

            } finally {
                setLoadingOtomes(false)
            }
        }

        fetchAllOtomes();

    }, [page, sort, reverse, filters, id])

    return { otomes, total, loadingOtomes, errorOtomes }
}