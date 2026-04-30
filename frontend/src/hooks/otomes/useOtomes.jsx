import { useEffect, useState } from "react"
import apiFetch from "../../utils/apiFetch"
import useOtomesParams from "./useOtomesParams"
import useOtomesQuery from "./useOtomesQuery"

export default function useOtomes() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [otomes, setOtomes] = useState([])
    const [total, setTotal] = useState(1)

    const params = useOtomesParams()
    const query = useOtomesQuery(params)

    useEffect(() => {

        async function fetchAllOtomes() {

            try {
                const data = await apiFetch('vn', query)

                setTotal(Math.ceil(data.count / 100))

                setOtomes(data.results)

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