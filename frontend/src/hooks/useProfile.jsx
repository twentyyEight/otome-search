import { useEffect, useState } from "react";
import dbFetch from '../utils/fetching/dbFetch'
import { useParams } from "react-router-dom";

export default function useProfile() {

    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { name } = useParams()

    useEffect(() => {

        async function getProfileData(name) {

            try {
                const res = await dbFetch(`profile/${name}`)
                setProfile(res)

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        getProfileData(name)

    }, [name])

    return { profile, loading, error }
}