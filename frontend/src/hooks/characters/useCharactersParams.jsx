import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

export default function useCharactersParams(id, fields = 'name, image.url, vns.title') {

    const [searchParams] = useSearchParams()

    return useMemo(() => {

        const page = Number(searchParams.get('page') ?? 1)
        const name = searchParams.get('name') ?? ''
        const roles = searchParams.getAll('role') ?? []
        const sexes = searchParams.getAll('sex') ?? []
        const traits = searchParams.getAll('trait') ?? []

        let filters = ['and', ['vn', '=', ['tag', '=', 'g542']]]

        // if (id) {
        //     if (id.starsWith(''))
        // }

        if (name.trim()) filters.push(['search', '=', name])
        if (roles.length > 0) roles.map(role => filters.push(["role", "=", role]))
        if (sexes.length > 0) sexes.map(sex => filters.push(["sex", "=", sex]))
        if (traits.length > 0) traits.map(trait => filters.push(["trait", "=", ["id", "=", trait]]))

        return {
            'filters': filters,
            'fields': fields,
            'results': 100,
            'sort': 'name',
            'count': true,
            'page': page
        }

    }, [searchParams, fields])
}