import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/useAuth'

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup } = useAuth()

    const onSubmit = async (data) => signup(data)

    return <>

        <h1>Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

            <input
                type="text"
                placeholder='Ingresa un nombre de usuario'
                {...register("name", {
                    required: "Ingresa un nombre de usuario",
                    minLength: {
                        value: 4,
                        message: "Debe tener mínimo 4 caracteres"
                    }
                })}
            />
            {errors.name && <p>{errors.name.message}</p>}

            <input
                type="email"
                placeholder='Ingresa un correo'
                {...register("email", { required: "Ingresa un correo" })}
            />
            {errors.email && <p>{errors.email.message}</p>}


            <input
                type="password"
                placeholder='Ingresa una contraseña'
                {...register("password", {
                    required: "Ingresa una contraseña",
                    minLength: {
                        value: 8,
                        message: "Debe tener mínimo 8 caracteres"
                    }
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type='submit'>Registrarse</button>
        </form>
    </>
}