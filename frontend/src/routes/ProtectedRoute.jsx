import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from '../contexts/auth/useAuth'

export default function ProtectedRoute() {

    const { isAuth, loading } = useAuth()

    if (loading) return <h1>Cargando...</h1>
    if (!isAuth) return <Navigate to='/' replace />

    return <Outlet />
}