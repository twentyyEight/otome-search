import { useEffect, useMemo, useState } from "react";
import apiFetch from "../../utils/fetching/apiFetch"
import { useSearchParams } from 'react-router-dom'

export default function useCharacters() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [characters, setCharacters] = useState([])
    const [total, setTotal] = useState(1)

    const [searchParams] = useSearchParams()

    const { page, name, roles, sexes, traits } = useMemo(() => ({
        page: Number(searchParams.get('page') ?? 1),
        name: searchParams.get('name') ?? '',
        roles: searchParams.getAll('role') ?? [],
        sexes: searchParams.getAll('sex') ?? [],
        traits: searchParams.getAll('trait') ?? []
    }), [searchParams])

    useEffect(() => {

        async function fetchCharacters() {

            try {

                let filtros = ['and', ['vn', '=', ['tag', '=', 'g542']], ['search', '=', name]]
                if (roles.length > 0) roles.map(role => filtros.push(["role", "=", role]))
                if (sexes.length > 0) sexes.map(sex => filtros.push(["sex", "=", sex]))
                if (traits.length > 0) traits.map(trait => filtros.push(["trait", "=", ["id", "=", trait]]))

                const query = {
                    'filters': filtros,
                    'fields': 'name, image.url, vns.title',
                    'results': 100,
                    'sort': 'name',
                    'count': true,
                    'page': page
                }
                const res = await apiFetch('character', query)

                setCharacters(res.results)
                setTotal(Math.ceil(res.count / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchCharacters()
    }, [name, page, roles, sexes, traits])

    return { characters, total, loading, error }
}