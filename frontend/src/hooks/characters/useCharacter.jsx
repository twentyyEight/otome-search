import { useEffect, useState } from "react";
import apiFetch from "../../utils/fetching/apiFetch"
import { useParams } from "react-router-dom";

export default function useCharacter() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [character, setCharacter] = useState([])

    const { id } = useParams()

    useEffect(() => {

        async function fetchCharacter() {

            try {

                const query = {
                    'filters': ["id", "=", id],
                    'fields': 'name, image.url, vns.title, traits.name',
                }
                const res = await apiFetch('character', query)

                setCharacter(res.results[0])

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchCharacter()
    }, [id])

    return { character, loading, error }
}