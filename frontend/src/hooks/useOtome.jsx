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
                // Query para el otome
                const query_otome = {
                    "filters": [
                        'and',
                        ["tag", "=", "g542"], // tag "otome"
                        ["id", "=", id], // ID otome
                        ['devstatus', "!=", "2"], // Que el juego no esté cancelado
                    ],
                    "fields": "title, image.url, olang, devstatus, description, developers.name, developers.id, tags.name, released, rating, va.character.name, va.staff.name"
                }

                // Query para los lanzamientos del otome
                const query_releases = {
                    "filters": ["vn", "=", ["id", "=", id]],
                    "fields": "title, languages.lang, platforms, released, minage, patch, freeware, official, voiced, notes, extlinks.url, extlinks.name",
                    "results": 100
                }

                // Query para los personajes del otome
                const query_characters = {
                    "filters": ["vn", "=", ["id", "=", id]],
                    "fields": "name, description, image.url, sex, vns.role, traits.group_id, traits.name",
                    results: 100
                }

                // Llamada a la API
                const data_otome = await apiFetch('vn', query_otome)
                const data_releases = await apiFetch('release', query_releases)
                const data_characters = await apiFetch('character', query_characters)

                // Actores de voces de cada personaje
                const voice_actors = data_otome.results[0].va

                // Se dejan solo los "traits" que hablen de la personalidad del personaje
                // Busca el nombre del actor de voz del personaje en base al id del personaje
                const characters = data_characters.results.map(char => ({
                    ...char,
                    traits: char.traits.filter(trait => trait.group_id == 'i39'),
                    voice_actor: voice_actors.find(va => va.character.id === char.id)?.staff.name,
                    role: char.vns.find(vn => vn.id == id)?.role
                }))

                // Separa los personajes por roles
                const characters_by_role = characters.reduce((res, char) => {
                    const role = char.role
                    if (!res[role]) res[role] = []
                    res[role].push(char)
                    return res
                }, {})

                // Recepción resultados
                setOtome({ ...data_otome.results[0], releases: data_releases.results, characters: characters_by_role })

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