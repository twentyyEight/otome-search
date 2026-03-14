import { useEffect, useState } from "react";

export default function useProfile(userId) {

    const [profileData, setProfileData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {

        async function getProfileData(id) {

            try {

                const res = await fetch(`http://localhost:3000/api/profile`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                    credentials: 'include'
                })

                const data = await res.json()

                if (!res.ok) throw { status: res.status, message: data.message }

                const collections = data.collections

                const collections_by_state = collections.reduce((res, collection) => {

                    const state = collection.state
                    if (!res[state]) res[state] = []
                    res[state].push(collection)
                    return res
                }, {})

                setProfileData({ name: data.name, collections: collections_by_state, characters: data.characters })

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        getProfileData(userId)

    }, [userId])

    return { profileData, loading, error }
}