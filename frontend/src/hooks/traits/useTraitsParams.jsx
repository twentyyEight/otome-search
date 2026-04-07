import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

export default function useTraitsParams() {

    const [searchParams] = useSearchParams()

    return useMemo(() => {

        {/* OBTENCIÓN PARAMETROS URL */ }
        const page = Number(searchParams.get('page') ?? 1)
        const name = searchParams.get('name') ?? ""

        {/* CONSTRUCCIÓN QUERY API */ }
        let query = {
            "fields": "name, group_id, group_name",
            "results": 100,
            "sort": "name",
            "page": page,
            "count": true
        }

        if (name.trim() !== '') query.search = name

        return query

    }, [searchParams])
}