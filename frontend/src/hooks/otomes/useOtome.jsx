import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import apiFetch from "../../utils/fetching/apiFetch"
import dbFetch from "../../utils/fetching/dbFetch";

export default function useOtome() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [otome, setOtome] = useState(null)
    const { id } = useParams()

    useEffect(() => {

        async function fetchOtome() {

            try {
                // Query para el otome
                const query_otome = {
                    "filters": [
                        'and',
                        ["tag", "=", "g542"], // tag "otome"
                        ["id", "=", id], // ID otome
                        ['devstatus', "!=", "2"], // Que el juego no esté cancelado
                    ],
                    "fields": "title, image.url, olang, devstatus, description, developers.id, developers.name, developers.id, released, rating, va.character.name, va.staff.name, tags.id, tags.name"
                }

                // Query para los lanzamientos del otome
                const query_releases = {
                    "filters": ["vn", "=", ["id", "=", id]],
                    "fields": "title, languages.lang, platforms, released, minage, patch, freeware, official, voiced, notes, extlinks.url, extlinks.name",
                    "results": 100
                }

                // Llamada a la API
                const data_otome = await apiFetch('vn', query_otome)
                const data_releases = await apiFetch('release', query_releases)
                const state = await dbFetch(`states/${id}`)

                // Recepción resultados
                setOtome({ ...data_otome.results[0], releases: data_releases.results, state })

                setLoading(false)

            } catch (error) {

                setError(error)
                setLoading(false)
            }
        }

        fetchOtome()

    }, [id])

    return { otome, error, loading }
}