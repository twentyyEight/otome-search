import useTagsCategories from "../../hooks/tags/useTagsCategories"
import Loading from "../../components/ui/Loading"
import Error from "../../components/ui/Error"
import { Link } from "react-router-dom"

export default function TagsCategories() {

    const { categories, loading, error } = useTagsCategories()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <h1>Tags by categories</h1>

        {categories.map(categorie => (

            <div key={categorie._id}>

                <h2>{categorie.name}</h2>
                <p>{categorie.description}</p>
                
                {categorie.tags.map(tag => (
                    <Link key={tag._id} to={`/tags/g${tag.id}`}>{tag.name}</Link>
                ))}
            </div>
        ))}
    </>
}