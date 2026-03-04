import { useEffect, useState } from "react"
import apiFetch from "../api"

export default function useAllOtomes() {

    const [otomes, setOtomes] = useState([])

    useEffect(() => {

        async function fetchAllOtomes() {

            try {
                const data = await apiFetch(["tag", "=", "g542"], "title, id, image.url")
                setOtomes(data.results)

            } catch (error) {
                console.log(error)
            }
        }

        fetchAllOtomes();
    }, [])

    return otomes
}