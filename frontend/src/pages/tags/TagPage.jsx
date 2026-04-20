import Loading from "../../components/ui/Loading";
import Error from "../../components/ui/Error";
import useTag from "../../hooks/tags/useTag"
import { Link } from "react-router-dom";
import OtomesPage from "../otomes/OtomesPage"

export default function TagPage() {

    const { tag, childTags, loading, error } = useTag()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <h1>{tag.name}</h1>
        <p>{tag.description}</p>

        {childTags.length > 0 &&

            <div>
                <h2>Child Tags</h2>

                {childTags.map(tag => (

                    <Link key={tag.id} to={`/tags/g${tag.id}`}>{tag.name}</Link>
                ))}
            </div>
        }

        <OtomesPage />
    </>
}