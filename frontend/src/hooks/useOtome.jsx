import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import apiFetch from "../utils/api"

export default function useOtome() {

    const [otome, setOtome] = useState(null)
    const { id } = useParams()

    useEffect(() => {

        async function fetchOtome(id_otome) {
            
            try {

                const query = {

                    "filters": [
                        'and',
                        ["tag", "=", "g542"], // tag "otome"
                        ["id", "=", id_otome], // ID del juego
                        ['devstatus', "!=", "2"] // Que el juego no esté cancelado
                    ],
                    "fields": "title, image.url",
                }

                const data = await apiFetch(query)
                setOtome(data.results)

            } catch (error) {

                console.log(error)
            }
        }

        fetchOtome(id)

    }, [id])

    return otome
}