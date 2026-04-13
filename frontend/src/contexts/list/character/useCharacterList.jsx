import { useContext } from 'react'
import { CharacterListContext } from '../contexts/list/CharacterListProvider'

export function useCharacterList() {
    return useContext(CharacterListContext)
}