import { ListProvider } from "../list/ListProvider";

export function CharacterListProvider({ children }) {

    return(
        <ListProvider type={"character"}>
            {children}
        </ListProvider>
    )
}