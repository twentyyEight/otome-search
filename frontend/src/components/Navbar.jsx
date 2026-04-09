import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/auth/AuthContext'
import { useContext } from 'react'

export default function Navbar() {

    const { isAuth, logout, user } = useContext(AuthContext)

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