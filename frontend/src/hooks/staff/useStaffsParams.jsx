import { useSearchParams } from "react-router-dom"

export default function useStaffsParams() {

    const [searchParams] = useSearchParams()

    {/* OBTENCIÓN PARAMETROS URL */ }
    const page = Number(searchParams.get('page') ?? 1)
    const name = searchParams.get('name') ?? ""

    {/* CONSTRUCCIÓN QUERIES URL */ }
    let url = `staffs?page=${page}`

    if (name.trim() !== '') url += `&name=${name}`

    return url
}