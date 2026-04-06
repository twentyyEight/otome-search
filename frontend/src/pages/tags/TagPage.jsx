import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useTag from "../../hooks/tags/useTag"
import useOtomes from "../../hooks/otomes/useOtomes";
import OtomeList from "../../components/OtomesPage/Base";
import { Link } from "react-router-dom";

export default function TagPage() {

    const { tag, childTags, loading, error } = useTag()
    const { otomes, total, loadingOtomes, errorOtomes } = useOtomes()

    if (loading || loadingOtomes) return <Loading />
    if (error || errorOtomes) return <Error />

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

        {otomes.length > 0 && <OtomeList otomes={otomes} total={total} />}
    </>
}