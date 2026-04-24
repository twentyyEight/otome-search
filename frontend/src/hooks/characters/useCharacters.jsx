import { useEffect, useState } from "react";
import apiFetch from "../../utils/fetching/apiFetch"
import useCharactersParams from "./useCharactersParams";
import { useParams } from "react-router-dom";

export default function useCharacters() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [characters, setCharacters] = useState([])
    const [total, setTotal] = useState(1)

    const { id } = useParams()
    const { query } = useCharactersParams(id)

    useEffect(() => {

        async function fetchCharacters() {

            try {
                const res = await apiFetch('character', query)

                setCharacters(res.results)
                setTotal(Math.ceil(res.count / 100))

            } catch (error) {

                setError(true)
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchCharacters()
    }, [query])

    return { characters, total, loading, error }
}