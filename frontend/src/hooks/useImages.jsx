import { useEffect, useState } from "react";
import apiFetch from "../utils/fetching/apiFetch";
import { splitArrayInThree } from "../utils/splitArr";

export default function useImages() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [images, setImages] = useState(null)

    useEffect(() => {

        async function fetchImages() {

            try {

                const query = {
                    "filters": [
                        "and",
                        ["tag", "=", "g542"],
                        ["rating", ">=", 70]
                    ],
                    "fields": "image.url",
                    "results": 100
                }

                const res = await apiFetch('vn', query)

                const splitedImgs = splitArrayInThree(res.results)

                setImages(splitedImgs)

            } catch (error) {

                console.error(error)
                setError(error)

            } finally {
                setLoading(false)
            }
        }

        fetchImages()

    }, [])

    return { images, loading, error }
}