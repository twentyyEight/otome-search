import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/auth/useAuth'

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { login } = useAuth()

    const onSubmit = async (data) => login(data)

    return <>

        <h1>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                type="text"
                placeholder='Ingresa tu correo'
                {...register("email", { required: "Ingresa un correo" })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
                type="password"
                placeholder='Ingresa tu contraseña'
                {...register("password", { required: "Ingresa una contraseña" })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type='submit'>Iniciar sesión</button>
        </form>
    </>
}