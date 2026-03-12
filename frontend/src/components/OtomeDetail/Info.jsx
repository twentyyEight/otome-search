import { useForm } from 'react-hook-form'
import { useAuth } from "../../contexts/useAuth.jsx"

export default function Info({ otome }) {

    const { register, handleSubmit } = useForm()
    const { isAuth, user } = useAuth()

    const onSubmitStates = (state) => {

        const data = {
            user_id: user.id,
            game_id: otome.id,
            game_name: otome.title,
            state
        }

        console.log(data)
    }

    return <>
        <img src={otome.image?.url} alt={otome.title} />

        {isAuth &&
            <select {...register('status', {
                onChange: handleSubmit(onSubmitStates)
            })}>
                <option value={0}>Jugando</option>
                <option value={1}>Completado</option>
                <option value={2}>En pausa</option>
                <option value={3}>Abandonado</option>
            </select>
        }

        <h1>{otome.title}</h1>
        {otome.released && <p>{otome.released}</p>}
        {otome.olang}
        {otome.developers.map((dev) => <p key={dev.id}>{dev.name}</p>)}
        <p>{otome.devstatus}</p>
        <p>{otome.rating}</p>
        <p>{otome.description}</p>
    </>
}