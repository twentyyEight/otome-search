import { useEffect, useState } from "react"
import dbFetch from "../../utils/fetching/dbFetch";
import apiFetch from "../../utils/fetching/apiFetch";
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

                const query = {
                    "filters": [
                        "and",
                        ["trait", "=", id],
                        ["vn", "=", ["tag", "=", "g542"]]
                    ],
                    "fields": "name, vns.title, image.url",
                    "sort": "name",
                    "results": 100
                }

                const trait = await dbFetch(`traits/${id}`)
                const characters = await apiFetch('character', query)

                setTrait(trait.info)
                setChildTraits(trait.childTraits)
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