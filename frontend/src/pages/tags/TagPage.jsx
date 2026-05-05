import { Link, useLocation, useNavigate } from "react-router-dom";
import useTag from "../../hooks/tags/useTag"
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import ModalBase from './ModalBase'

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

    if (!location.state) return (
        <>
            <h1>{tag.name}</h1>
            <p>{tag.description}</p>

            <h2>Child Tags</h2>
            <ul>
                {tag.childs.map(child => (
                    <li key={child.id}>
                        <Link to={`/tags/${child.id}`}>
                            {child.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )

    return (
        <ModalBase title={tag.name}>
            {/* contenido */}
            <p>{tag.description}</p>
            <button onClick={() => addTagToURL(tag.id, tag.name)}>Add to filter</button>

            <h2>Child Tags</h2>
            <ul>
                {tag.childs.map(child => (
                    <li key={child.id}>
                        <Link
                            to={`/tags/${child.id}`}
                            state={{ background: background }}
                        >
                            {child.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </ModalBase>
    );
}