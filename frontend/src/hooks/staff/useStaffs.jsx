import { useEffect, useState } from "react"
import dbFetch from '../../utils/fetching/dbFetch'
import useStaffsParams from "./useStaffsParams"

export default function useStaffs() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [staffs, setStaffs] = useState(null)
    const [total, setTotal] = useState(0)

    const url = useStaffsParams()

    useEffect(() => {

        async function fetchTags() {

            try {
                const res = await dbFetch(url)

                setStaffs(res.staffs)
                setTotal(Math.ceil(res.total / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTags()

    }, [url])

    return { staffs, total, loading, error }
}