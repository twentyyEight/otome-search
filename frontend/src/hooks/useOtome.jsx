import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import apiFetch from "../utils/api"

export default function useOtome() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [otome, setOtome] = useState(null)
    const { id } = useParams()

    useEffect(() => {

        async function fetchOtome(id) {

            try {

                const query_otome = {

                    "filters": [
                        'and',
                        ["tag", "=", "g542"], // tag "otome"
                        ["id", "=", id], // ID otome
                        ['devstatus', "!=", "2"], // Que el juego no esté cancelado
                    ],
                    "fields": "title, image.url, olang, devstatus, description, developers.name, developers.id, tags.name, released, rating"
                }

                const query_releases = {
                    "filters": ["vn", "=", ["id", "=", "v1715"]],
                    "fields": "title, languages.lang, platforms, released, minage, patch, freeware, official, voiced, notes, extlinks.url, extlinks.name",
                    "results": 100
                }

                const data_otome = await apiFetch('vn', query_otome)
                const data_releases = await apiFetch('release', query_releases)

                setOtome({ ...data_otome.results[0], releases: data_releases.results })

                setLoading(false)

            } catch (error) {

                setError(error)
                setLoading(false)
            }
        }

        fetchOtome(id)

    }, [id])

    return { otome, error, loading }
}