import { Link, useLocation } from "react-router-dom";
import useTags from "../../hooks/tags/useTags"
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import ModalBase from './ModalBase'

export default function TagsModal() {

    const location = useLocation();

    const { tags, loading, error } = useTags()

    if (loading) return <Loading />
    if (error) return <Error />

    const content = tags.map(tag => (
        <div key={tag.id}>
            <h2>{tag.name}</h2>
            <p>{tag.description}</p>
            <div>
                {tag.childs.map(child => (
                    <p key={child.id}>
                        <Link
                            to={`${child.id}`}
                            state={{ background: location?.state?.background }}
                        >
                            {child.name}
                        </Link>
                    </p>
                ))}
            </div>
        </div>
    ))

    if (!location.state) return <div>{content}</div>  // página normal

    return <ModalBase title={"Tags"}>{content}</ModalBase>  // modal
}