import { useContext } from 'react'
import { CollectionContext } from './CollectionContext'

export function useCollection() {
    return useContext(CollectionContext)
}