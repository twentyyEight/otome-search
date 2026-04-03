import { useEffect, useState } from "react"
import apiFetch from "../../utils/fetching/apiFetch"
import { useParams } from "react-router-dom";
import useOtomesParams from "./useOtomesParams";

export default function useOtomes() {

    const [loadingOtomes, setLoadingOtomes] = useState(true)
    const [errorOtomes, setErrorOtomes] = useState(null)

    const [otomes, setOtomes] = useState([])
    const [total, setTotal] = useState(1)

    const { id } = useParams()
    const query = useOtomesParams(id)

    useEffect(() => {

        async function fetchAllOtomes() {

            try {

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

    }, [query])

    return { otomes, total, loadingOtomes, errorOtomes }
}