import axios from "axios";
import { useEffect, useState } from "react";
import buildFilters from "./buildFilters";

export default function useFetch(page) {

    const [vns, setVNs] = useState([])
    const [limiter, setLimiter] = useState(true)
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState(['and', ["tag", "=", "g542"]])

    const addFilters = (formValues) => {

        const newFilters = buildFilters(formValues)
        setFilters(newFilters)
    }

    useEffect(() => {

        async function getVisualNovels() {

            console.log(filters)

            const res = await axios.post('https://api.vndb.org/kana/vn', {
                filters: filters,
                fields: "title, id",
                results: 100,
                page: page,
            })

            setVNs(res.data.results)
            setLimiter(res.data.more)
            setLoading(false)
        }

        getVisualNovels()

    }, [page, filters])

    return { vns, limiter, loading, addFilters }
}