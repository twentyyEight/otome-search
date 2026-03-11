import { useAuth } from "../contexts/useAuth.jsx"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {

    const { isAuth, loading } = useAuth()

    if (loading) return <h1>Cargando...</h1>
    if (!isAuth) return <Navigate to='/' replace />

    return <Outlet />
}