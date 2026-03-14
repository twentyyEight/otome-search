import { CollectionContext } from './CollectionContext'

export function CollectionProvider({ children }) {

    const saveOtome = async (otome) => {

        try {

            const res = await fetch(`http://localhost:3000/api/otome`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(otome),
                credentials: 'include'
            })

            const data = await res.json()

            if (!res.ok) throw { status: res.status, message: data.message }

            console.log(data.message)

        } catch (error) {
            console.error(error)
        }
    }

    const saveCharacter = async (character) => {

        try {

            const res = await fetch(`http://localhost:3000/api/character`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(character),
                credentials: 'include'
            })

            const data = await res.json()

            if (!res.ok) throw { status: res.status, message: data.message }

            console.log(data.message)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CollectionContext.Provider value={{ saveOtome, saveCharacter }}>
            {children}
        </CollectionContext.Provider>
    )
}