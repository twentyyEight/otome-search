import { AuthContext } from "./AuthContext"
import { useState, useEffect } from "react"
import dbFetch from '../../utils/fetching/dbFetch'

export function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    console.log(isAuth)

    const signup = async (user) => {

        try {
            const res = await dbFetch('register', { method: 'POST', body: user })

            setUser(res)
            setIsAuth(true)

        } catch (error) {

            setIsAuth(false)
            console.error(error)
        }
    }

    const login = async (user) => {

        try {
            const res = await dbFetch('login', { method: 'POST', body: user })
            setUser(res)
            setIsAuth(true)

        } catch (error) {
            setIsAuth(false)
            console.error(error.message)
        }
    }

    const logout = async () => {

        try {
            await dbFetch('logout')

            setUser(null)
            setIsAuth(false)

        } catch (error) {

            setIsAuth(false)
            console.error(error)
        }
    }

    useEffect(() => {

        async function checkToken() {

            try {
                const res = await dbFetch('verify')

                if (!res.ok) throw new Error(res.status)

                setIsAuth(true)
                setUser(res)

            } catch (error) {

                setIsAuth(false)
                setUser(null)
                console.error(error)

            } finally {
                setLoading(false);
            }
        }

        checkToken()
    }, [])

    return (
        <AuthContext.Provider value={{ signup, login, logout, isAuth, loading, user }}>
            {children}
        </AuthContext.Provider>
    );
}