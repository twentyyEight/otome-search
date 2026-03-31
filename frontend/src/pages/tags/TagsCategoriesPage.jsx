import useTagsCategories from "../../hooks/tags/useTagsCategories"
import Loading from "../../components/Loading"
import Error from "../../components/Error"
import { Link } from "react-router-dom"

export default function TagsCategories() {

    const { categories, loading, error } = useTagsCategories()

    if (loading) return <Loading />
    if (error) return <Error />

    console.log(categories)

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