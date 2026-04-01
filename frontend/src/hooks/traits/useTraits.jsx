import { useEffect, useState } from "react";
import dbFetch from '../../utils/fetching/dbFetch'
import { useSearchParams } from 'react-router-dom'

export default function useTraits() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [traits, setTraits] = useState([])
    const [total, setTotal] = useState(1)

    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page') ?? 1)
    const name = searchParams.get('name') ?? ""


    useEffect(() => {

        async function fetchTraits() {

            try {
                const res = await dbFetch(`traits?page=${page}&name=${name}`)

                setTraits(res.traits)
                setTotal(Math.ceil(res.total / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTraits()
    }, [page, name])

    return { traits, total, loading, error }

}