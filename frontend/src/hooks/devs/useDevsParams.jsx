import { useSearchParams } from "react-router-dom"

export default function useDevsParams() {

    const [searchParams] = useSearchParams()

    {/* OBTENCIÓN PARAMETROS URL */ }
    const page = Number(searchParams.get('page') ?? 1)
    const name = searchParams.get('name') ?? ''
    const langs = searchParams.get('lang') ?? []
    const types = searchParams.getAll('type') ?? []

    {/* CONSTRUCCIÓN QUERIES URL */ }
    let url = `devs?page=${page}`

    if (name.trim()) url += `&name=${name}`
    if (types.length > 0) url += types.map(type => `&type=${type}`).join('')
    if (langs.length > 0) url += langs.map(type => `&lang=${type}`).join('')

    return url
}