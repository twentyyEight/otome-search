import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import apiFetch from "../api"

export default function useOtome() {

    const [otome, setOtome] = useState(null)
    const { id } = useParams()

    useEffect(() => {

        async function fetchOtome(id_otome) {

            // Busca por ID y con el tag "otome"
            let filters = ['and', ["tag", "=", "g542"], ["id", "=", id_otome]]
            
            try {
                const data = await apiFetch(filters, "title, image.url")
                setOtome(data.results)

            } catch (error) {
                
                console.log(error)
            }
        }

        fetchOtome(id)
    }, [id])

    return otome
}