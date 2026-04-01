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
    const name = searchParams.get('name') ?? ""
    const types = searchParams.getAll('type') ?? null

    useEffect(() => {

        async function fetchTags() {

            try {

                let query = `tags?page=${page}&name=${name}`
                if (types.length > 0) query += types.map(type => `&type=${type}`).join('')

                const res = await dbFetch(query)
                setTags(res.tags)
                setTotal(Math.ceil(res.total / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTags()

    }, [page, name, types])

    return { tags, total, loading, error }
}