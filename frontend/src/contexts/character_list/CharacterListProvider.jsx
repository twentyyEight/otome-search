import { useState } from "react";
import dbFetch from '../../utils/fetching/dbFetch'
import { CharacterListContext } from "./CharacterListContext";

export function CharacterListProvider({ children }) {

    const [loading, setLoading] = useState(false)
    const [characterLists, setCharacterLists] = useState([])
    const [characterList, setCharacterList] = useState(null)

    const createCharacterList = async (name) => {

        setLoading(true)

        try {
            const res = await dbFetch('characters/lists', { method: 'POST', body: name })
            console.log(res)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    const updateCharacterList = async (name) => {

        setLoading(true)

        try {
            const res = await dbFetch('characters/lists', { method: 'PUT', body: name })
            console.log(res)
            return res
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    const deleteCharacterList = async (id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`characters/lists/${id}`, { method: 'DELETE' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getCharacterLists = async () => {

        setLoading(true)

        try {
            const res = await dbFetch('characters/lists')
            setCharacterLists(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getCharacterList = async (id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`characters/lists/${id}`)
            setCharacterList(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const addToCharacterList = async (id, character_id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`characters/lists/${id}/character/${character_id}`, { method: 'POST' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteToCharacterList = async (id, character_id) => {

        setLoading(true)

        try {
            const res = await dbFetch(`characters/lists/${id}/character/${character_id}`, { method: 'DELETE' })
            console.log(res)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <CharacterListContext.Provider value={{
            loading,
            characterList,
            characterLists,
            createCharacterList,
            updateCharacterList,
            deleteCharacterList,
            getCharacterList,
            getCharacterLists,
            addToCharacterList,
            deleteToCharacterList
        }}>
            {children}
        </CharacterListContext.Provider>
    )
}