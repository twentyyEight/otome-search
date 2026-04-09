import { CharacterContext } from "./CharacterContext";
import dbFetch from "../../utils/fetching/dbFetch";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from '../auth/AuthContext'

export function CharacterProvider({ children }) {

    const { isAuth } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState(false)


    const addCharacter = async (id) => {
        setLoading(true)
        try {
            const res = await dbFetch('characters', { method: 'POST', body: { id } })
            console.log(res)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteCharacter = async (id) => {
        setLoading(true)
        try {
            const res = await dbFetch(`characters/${id}`, { method: 'DELETE' })
            console.log(res)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        if (!isAuth) {
            setFavorites([])
            return
        }

        const getFavorites = async () => {

            setLoading(true)

            try {
                const res = await dbFetch(`characters`)
                setFavorites(res)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getFavorites()

    }, [isAuth])

    return(
        <CharacterContext.Provider value={{ addCharacter, deleteCharacter, loading, favorites }}>
            {children}
        </CharacterContext.Provider>
    )
}