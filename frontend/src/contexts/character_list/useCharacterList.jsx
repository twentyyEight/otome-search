import { useContext } from "react";
import { CharacterListContext } from "./CharacterListContext";

export function useCharacterList() {
    return useContext(CharacterListContext)
}