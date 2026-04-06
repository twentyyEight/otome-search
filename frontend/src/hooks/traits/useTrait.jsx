import { useEffect, useState } from "react"
import apiFetch from "../../utils/fetching/apiFetch";
import dbFetch from '../../utils/fetching/dbFetch'
import { useParams } from "react-router-dom";

export default function useTrait() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [trait, setTrait] = useState(null)
    const [childTraits, setChildTraits] = useState([])

    const { id } = useParams()

    useEffect(() => {

        async function fetchTag() {

            try {

                const query_trait = {
                    "filters": ["id", "=", id],
                    "fields": "name, description"
                }

                const trait = await apiFetch('trait', query_trait)
                const child_traits = await dbFetch(`traits/childs/${id}`)

                setTrait(trait.results[0])
                setChildTraits(child_traits)

            } catch (error) {
                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchTag()

    }, [id])

    return { trait, childTraits, loading, error }

}