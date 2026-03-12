import { AuthContext } from "./AuthContext"
import { useState, useEffect } from "react"

export function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {

        try {

            const res = await fetch(`http://localhost:3000/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
                credentials: 'include'
            })

            const data = await res.json()

            if (!res.ok) throw { status: res.status, message: data.message }

            console.log(data.message)
            setIsAuth(true)

        } catch (error) {

            setIsAuth(false)
            console.error(error)
        }
    }

    const login = async (user) => {

        try {

            const res = await fetch(`http://localhost:3000/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
                credentials: 'include'
            })

            const data = await res.json()

            if (!res.ok) throw { status: res.status, message: data.message }

            console.log(data.message)
            setIsAuth(true)

        } catch (error) {

            setIsAuth(false)
            console.error(error.message)
        }
    }

    const logout = async () => {

        try {

            const res = await fetch(`http://localhost:3000/api/logout`)

            const data = await res.json()

            if (!res.ok) throw { status: res.status, message: data.message }

            console.log(data.message)
            setIsAuth(false)

        } catch (error) {

            setIsAuth(false)
            console.error(error)
        }
    }

    useEffect(() => {

        async function checkToken() {

            try {
                const res = await fetch("http://localhost:3000/api/verify", {
                    credentials: "include"
                });

                const data = await res.json()

                if (!res.ok) throw { status: res.status, message: data.message }

                setIsAuth(true)
                setLoading(false)

            } catch (error) {

                setIsAuth(false)
                setLoading(false)
                console.error(error)
            }
        }

        checkToken()
    }, [])

    return (
        <AuthContext.Provider value={{ signup, login, logout, isAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
}