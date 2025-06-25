import { useEffect, useState } from "react";
import buildFilters from "../utils/buildFilters.js";
import { getAllVisualNovels } from "../utils/api.js"

export default function useAllVisualNovels(page) {

    const [vns, setVNs] = useState([])
    const [limiter, setLimiter] = useState(true)
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState(['and', ["tag", "=", "g542"]])
    const [error, setError] = useState(false)

    const addFilters = (formValues) => {

        const newFilters = buildFilters(formValues)
        setFilters(newFilters)
    }

    useEffect(() => {

        async function fetchVisualNovels() {

            const res = await getAllVisualNovels(filters, page)

            if (res.status == 200) {
                setVNs(res.data.results)
                setLimiter(res.data.more)
                setLoading(false)
            }
            else {
                setError(true)
                setLoading(false)
            }
        }

        fetchVisualNovels()

    }, [page, filters])

    return { vns, limiter, loading, addFilters, error }
}