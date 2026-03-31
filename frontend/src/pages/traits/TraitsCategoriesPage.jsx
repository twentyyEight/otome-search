import useTraitsCategories from "../../hooks/traits/useTraitsCategories"
import { Link } from "react-router-dom"
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export default function TraitsCategories() {

    const { categories, loading, error } = useTraitsCategories()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <h1>Traits by categories</h1>
        {categories.map(categorie => (

            <div key={categorie._id}>
                <h2>{categorie.name}</h2>
                <p>{categorie.description}</p>

                {categorie.tags.map(tag => (
                    <Link key={tag._id} to={`/traits/i${tag.id}`}>{tag.name}</Link>
                ))}
            </div>
        ))}
    </>
}