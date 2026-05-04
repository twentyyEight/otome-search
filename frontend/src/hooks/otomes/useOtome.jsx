import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiFetch from "../../utils/fetching/apiFetch"
import charactersFormarter from "../../utils/formatters/characterFormatter"
import relationsFormatter from "../../utils/formatters/relationsFormatter"

export default function useOtome() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [otome, setOtome] = useState({})

    const { id } = useParams()

    useEffect(() => {

        async function fetchOtome(id) {

            try {
                const data_otome = await apiFetch('vn', {
                    "filters": ["and", ["tag", "=", "g542"], ["devstatus", "!=", 2], ["id", "=", id]],
                    "fields": "title, image.url, developers.name, rating, votecount, description, relations{title,relation,relation_official}, olang, tags.name, va{staff{name},character{id}}"
                })

                const data_releases = await apiFetch('release', {
                    "filters": ["vn", "=", ["id", "=", id]],
                    "fields": "title, languages.lang, platforms, released, minage, patch, official, voiced, notes, extlinks{url,label}",
                    "sort": "released",
                    "results": 100
                })

                const data_characters = await apiFetch('character', {
                    "filters": ["vn", "=", ["id", "=", id]],
                    "fields": "name, vns.role, image.url, sex, traits{spoiler,lie,name,group_id}, description",
                    "results": 100
                })

                const { va, relations, ...otome } = data_otome.results[0]

                otome.relations = relationsFormatter(relations)

                setOtome({
                    ...otome,
                    releases: data_releases.results,
                    characters: charactersFormarter(data_characters.results, id, va)
                })


            } catch (err) {

                setError(true)
                console.error(err)

            } finally {
                setLoading(false)
            }
        }

        fetchOtome(id);

    }, [id])

    return { otome, loading, error }
}