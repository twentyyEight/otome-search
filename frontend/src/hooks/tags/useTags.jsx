import { useEffect, useState } from "react"
import dbFetch from '../../utils/fetching/dbFetch'
import { useSearchParams } from 'react-router-dom'

export default function useTags() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [tags, setTags] = useState(null)
    const [total, setTotal] = useState(0)

    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 1)
    const name = searchParams.get('name') ?? null
    const type = searchParams.getAll('type') ?? null

    useEffect(() => {

        async function fetchTags(page) {

            try {

                let query = `tags?page=${page}`
                if (name) query += `&name=${name}`
                if (type.length > 0) query += type.map(t => `&type=${t}`).join('')

                const res = await dbFetch(query)
                setTags(res.tags)
                setTotal(res.total)

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTags(page)

    }, [page, name, type])

    return { tags, total, loading, error }
}