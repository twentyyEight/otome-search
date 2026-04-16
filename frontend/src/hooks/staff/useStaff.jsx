import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiFetch from "../../utils/fetching/apiFetch"
import staffFormatter from "../../utils/formatters/staff.formatter";

export default function useStaff() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [staff, setStaff] = useState(null)

    const { id } = useParams()

    useEffect(() => {

        async function fetchStaff() {

            try {
                const query_staff = {
                    "filters": ['id', '=', id],
                    "fields": "name, gender, description, lang, aliases{name,latin,ismain}, extlinks{label, url,id}, ismain"
                }

                const query_vn = {
                    "filters": [
                        "and",
                        ["staff", "=", ["id", "=", id]],
                        ["tag", "=", "g542"]
                    ],
                    "fields": "title, va.staff.id, staff{role,note}, va.character{name,image.url}, released, image.url",
                    "results": 100
                }

                const res_staff = await apiFetch('staff', query_staff)
                const res_vn = await apiFetch('vn', query_vn)

                const main = await staffFormatter(res_staff.results, res_vn.results)

                setStaff(main)

            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchStaff()

    }, [id])

    return { staff, loading, error }
}