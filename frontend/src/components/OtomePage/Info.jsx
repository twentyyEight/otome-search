import { useAuth } from "../../contexts/auth/useAuth"
import { Link } from 'react-router-dom'
import Actions from "./Actions"

export default function Info({ otome }) {

    const { isAuth } = useAuth()

    return <>
        <img src={otome.image?.url} alt={otome.title} />

        {isAuth && <Actions st={otome.state} id={otome.id} />}

        <h1>{otome.title}</h1>
        {otome.released && <p>{otome.released}</p>}
        {otome.olang}

        {otome.developers.map((dev) => (
            <Link to={`/devs/${dev.id}`} key={dev.id}>{dev.name}</Link>
        ))}

        <p>{otome.devstatus}</p>
        <p>{otome.rating}</p>
        <p>{otome.description}</p>

        {otome.tags.map((tag) => (
            <Link to='/tags' key={tag.id}>{tag.name}</Link>
        ))}
    </>
}
