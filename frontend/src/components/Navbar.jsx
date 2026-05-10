import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/auth/useAuth'

export default function Navbar() {

    const { isAuth, logout, user } = useAuth()

    return (
        <nav>
            {isAuth ? (
                <>
                    <Link to={`/profile/${user?.name}`}>Profile</Link>
                    <button onClick={logout}>Log out</button>
                </>
            ) : (
                <>
                    <Link to='/login'>Log in</Link>
                    <Link to='/register'>Register</Link>
                </>
            )}
        </nav>
    )
}