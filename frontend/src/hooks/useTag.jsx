import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import apiFetch from "../utils/api.js"
import buildFilters from "../utils/filters/build"

export default function useTag(page, filters) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tag, setTag] = useState(null)
    const [otomes, setOtomes] = useState(null)
    const [total, setTotal] = useState(1)
    const { id } = useParams()
    let { sort } = filters

    const reverse = sort.includes('reverse') ? true : false
    sort = sort.replace("reverse", "")

    const base = ['and',
        ['tag', '=', 'g542'],
        ['tag', '=', id]
    ]
    const filtros = buildFilters(filters, base)

    useEffect(() => {

        async function fetchTag(id) {

            try {

                const query_tag = {
                    "filters": ['id', '=', id],
                    "fields": "name, description"
                }

                const query_otomes = {
                    "filters": filtros,
                    "fields": "title, image.url",
                    "results": 100,
                    "page": page,
                    "sort": sort,
                    "reverse": reverse,
                    "count": true
                }

                const res_tag = await apiFetch('tag', query_tag)
                const res_otomes = await apiFetch('vn', query_otomes)

                setTag(res_tag.results[0])
                setOtomes(res_otomes.results)
                setTotal(Math.ceil(res_otomes.count / 100))

            } catch (error) {
                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTag(id)

    }, [id, sort, reverse, page, filtros])

    return { tag, otomes, total, loading, error }

}