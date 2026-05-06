import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/auth/useAuth'

export default function Navbar() {

    const { isAuth, logout, user } = useAuth()

    return (
        <nav>
            {isAuth ? (
                <>
                    <Link to={`/profile/${user?.name}`}>Perfil</Link>
                    <button onClick={logout}>Cerrar sesión</button>
                </>
            ) : (
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Registrarse</Link>
                </>
            )}
        </nav>
    )
}