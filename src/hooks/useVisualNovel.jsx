import { getVisualNovel } from "../services/api"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

export default function useVisualNovel() {

    const [vn, setVn] = useState([])
    const [releases, setReleases] = useState([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {

        async function fetchVisualNovel(vn_id) {

            const res = await getVisualNovel(vn_id)

            setVn(res[0])
            setReleases(res[1])
            setLoading(false)

        }

        fetchVisualNovel(id)
    }, [id])

    return {vn, releases, loading}
}