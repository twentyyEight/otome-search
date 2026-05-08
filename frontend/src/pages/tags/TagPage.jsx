import { Link, useLocation, useNavigate } from "react-router-dom";
import useTag from "../../hooks/tags/useTag"
import Loading from '../../components/ui/Loading'
import Error from '../../components/ui/Error'
//import ModalBase from './ModalBase'
import ModalBase from '../../components/ui/ModalBase'

export default function TagModal() {

    const { tag, loading, error } = useTag();

    const navigate = useNavigate()
    const location = useLocation();
    const background = location.state?.background

    if (loading) return <Loading />
    if (error) return <Error />

    const addTagToURL = (id, name) => {

        const params = new URLSearchParams(background.search)
        params.append('tag', 'g' + id)

        sessionStorage.setItem('selectedTags', JSON.stringify([{ id: id, name: name }]))

        navigate(location.pathname, {
            replace: true,
            state: {
                ...location.state,
                background: {
                    ...background,
                    search: `?${params.toString()}`
                }
            }
        });
    }

    const content = <div>
        <h1>{tag.name}</h1>
        <p>{tag.description}</p>
        {location.state && <button onClick={() => addTagToURL(tag.id, tag.name)}>Add to filter</button>}

        <h2>Child Tags</h2>
        <ul>
            {tag.childs.map(child => (
                <li key={child.id}>
                    <Link
                        to={`/tags/${child.id}`}
                        state={location.state ? { background: background } : undefined}
                    >
                        {child.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>

    if (!location.state) return content

    return (
        <ModalBase
            handleClose={() => navigate(background)}
            handleReturn={() => navigate(-1)}
        >
            {content}
        </ModalBase>
    )
}