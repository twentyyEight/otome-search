import { useEffect, useState } from "react"
import apiFetch from "../../utils/fetching/apiFetch"
import useOtomesParams from "./useOtomesParams";

export default function useOtomes() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [otomes, setOtomes] = useState([])
    const [total, setTotal] = useState(1)

    const { query } = useOtomesParams()

    useEffect(() => {

        async function fetchAllOtomes() {

            try {

                // LLamada a la API
                const data = await apiFetch('vn', query)

                // Redondea el número de resultados totales al sgte entero superior
                setTotal(Math.ceil(data.count / 100)) // paginas totales

                setOtomes(data.results) // otomes

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchAllOtomes();

    }, [query])

    return { otomes, total, loading, error }
}