import { useSearchParams } from "react-router-dom"

export default function useTagsParams() {

    const [searchParams] = useSearchParams()

    {/* OBTENCIÓN PARAMETROS URL */ }
    const page = Number(searchParams.get('page') ?? 1)
    const name = searchParams.get('name') ?? ""
    const types = searchParams.getAll('type') ?? []

    {/* CONSTRUCCIÓN QUERIES URL */ }
    let url = `tags?page=${page}`

    if (name.trim() !== '') url += `&name=${name}`
    if (types.length > 0) url += types.map(type => `&type=${type}`).join('')

    return url
}