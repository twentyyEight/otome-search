import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/auth/AuthContext"

export default function ProtectedRoute() {

    const { isAuth, loading } = useContext(AuthContext)

    if (loading) return <h1>Cargando...</h1>
    if (!isAuth) return <Navigate to='/' replace />

    return <Outlet />
}