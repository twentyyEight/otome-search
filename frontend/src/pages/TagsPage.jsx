import { Link } from "react-router-dom";
import useTags from "../hooks/useTags"
import Loading from '../components/Loading'
import Error from '../components/Error'

export default function TagsPage() {

    const { tags, loading, error } = useTags()

    if (loading) return <Loading />
    if (error) return <Error />

    return (
        <>
        <h1>Tags</h1>
        {tags.map(tag => (
            
            <div key={tag.id}>
                <h2><Link to={`${tag.id}`}>{tag.name}</Link></h2>

                {tag.childs.map(child => (
                    <p key={child.id}><Link to={`${child.id}`}>{child.name}</Link></p>
                ))}
            </div>
        ))}
        </>
    )
}