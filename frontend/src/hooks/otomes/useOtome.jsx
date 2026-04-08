import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import apiFetch from "../../utils/fetching/apiFetch"
import dbFetch from "../../utils/fetching/dbFetch";
import { useAuth } from "../../contexts/auth/useAuth";
import useCharacters from '../characters/useCharacters'

export default function useOtome() {

    const { id } = useParams()

    const { isAuth } = useAuth()
    const { characters, loading: loading_characters, error: error_characters } = useCharacters()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [otome, setOtome] = useState(null)

    useEffect(() => {

        async function fetchOtome() {

            try {
                /* QUERIES */
                const query_otome = {
                    "filters": [
                        'and',
                        ["tag", "=", "g542"], // tag "otome"
                        ["id", "=", id], // ID otome
                        ['devstatus', "!=", "2"], // Que el juego no esté cancelado
                    ],
                    "fields": "title, image.url, devstatus, description, developers.name, released, rating, tags.id, tags.name, va.staff.name, va.character.id"
                }

                const query_releases = {
                    "filters": ["vn", "=", ["id", "=", id]],
                    "fields": "title, languages.lang, platforms, released, minage, patch, freeware, official, voiced, notes, extlinks.url, extlinks.name",
                    "results": 100
                }

                /* LLAMADA API Y BD */
                const data_otome = await apiFetch('vn', query_otome)
                const data_releases = await apiFetch('release', query_releases)
                const state = isAuth ? await dbFetch(`states/${id}`) : ""

                data_otome.results[0].state = state

                /* ENTREGA RESULTADOS */
                setOtome({
                    info: data_otome.results[0],
                    releases: data_releases.results,
                    characters: characters
                })

            } catch (error) {
                setError(true)
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchOtome()

    }, [id, isAuth, characters])

    const isLoading = loading || loading_characters
    const isError = error || error_characters

    return { otome, error: isError, loading: isLoading }
}