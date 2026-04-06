import { useEffect, useState } from "react"
import apiFetch from "../../utils/fetching/apiFetch";
import dbFetch from '../../utils/fetching/dbFetch'
import { useParams } from "react-router-dom";

export default function useTrait() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [trait, setTrait] = useState(null)
    const [childTraits, setChildTraits] = useState([])
    const [characters, setCharacters] = useState([])

    const { id } = useParams()

    useEffect(() => {

        async function fetchTag() {

            try {

                const query_trait = {
                    "filters": ["id", "=", id],
                    "fields": "name, description"
                }

                const query_characters = {
                    "filters": [
                        "and",
                        ["trait", "=", id],
                        ["vn", "=", ["tag", "=", "g542"]]
                    ],
                    "fields": "name, vns.title, image.url",
                    "sort": "name",
                    "results": 100
                }

                const trait = await apiFetch('trait', query_trait)
                const characters = await apiFetch('character', query_characters)
                const child_traits = await dbFetch(`traits/childs/${id}`)

                setTrait(trait.results[0])
                setChildTraits(child_traits)
                setCharacters(characters.results)

            } catch (error) {
                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTag()

    }, [id])

    return { trait, childTraits, characters, loading, error }

}