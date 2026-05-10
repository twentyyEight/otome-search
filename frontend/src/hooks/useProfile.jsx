import { useEffect, useState } from "react";
import dbFetch from '../utils/fetching/dbFetch'
import apiFetch from '../utils/fetching/apiFetch'
import { useParams } from "react-router-dom";

export default function useProfile() {

    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { name } = useParams()

    useEffect(() => {

        async function getProfileData() {

            try {
                const res = await dbFetch(`profile/${name}`)

                const lists = await Promise.all(res.lists.map(async list => {

                    if (list.otomes.length === 0) return { _id: list._id, name: list.name, otomes: [] }

                    const ids = list.otomes.slice(0, 3).map(otome => otome.id)

                    const api_res = await apiFetch('vn', {
                        "filters": ['or', ...ids.map(id => ['id', '=', id])],
                        "fields": "image.url, title"
                    })

                    return { _id: list._id, name: list.name, otomes: api_res.results }
                }))

                setProfile({ name: res.name, lists })

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        getProfileData()

    }, [name])

    return { profile, loading, error }
}