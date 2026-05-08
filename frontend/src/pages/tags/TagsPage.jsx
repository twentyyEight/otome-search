import { Link, useLocation, useNavigate } from "react-router-dom";
import useTags from "../../hooks/tags/useTags"
import Loading from '../../components/ui/Loading'
import Error from '../../components/ui/Error'
import ModalBase from '../../components/ui/ModalBase'

export default function TagsModal() {

    const navigate = useNavigate()
    const location = useLocation()
    const background = location.state?.background

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
                            state={{ background: background }}
                        >
                            {child.name}
                        </Link>
                    </p>
                ))}
            </div>
        </div>
    ))

    if (!location.state) return <div>{content}</div>

    return (
        <ModalBase
            handleClose={() => navigate(background)}
        >
            {content}
        </ModalBase>
    )
}