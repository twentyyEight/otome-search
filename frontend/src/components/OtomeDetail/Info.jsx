import { useForm } from 'react-hook-form'
import { useAuth } from "../../contexts/auth/useAuth"
import { useCollection } from '../../contexts/collection/useCollection'
import { Link } from 'react-router-dom'

export default function Info({ otome }) {

    const { register, handleSubmit } = useForm()
    const { isAuth, userId } = useAuth()
    const { saveOtome } = useCollection()

    const onSubmitState = (state) => {

        const data = {
            user_id: userId,
            id: otome.id,
            title: otome.title,
            img: otome.image?.url,
            ...state
        }

        saveOtome(data)
    }

    return <>
        <img src={otome.image?.url} alt={otome.title} />

        {isAuth &&
            <select {...register('state', {
                valueAsNumber: true,
                onChange: handleSubmit(onSubmitState)
            })}>
                <option value="">Estado</option>
                <option value={0}>Jugando</option>
                <option value={1}>Completado</option>
                <option value={2}>En pausa</option>
                <option value={3}>Abandonado</option>
            </select>
        }

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