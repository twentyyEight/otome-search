import { ListProvider } from "../list/ListProvider"

export function OtomeListProvider({ children }) {

    return (
        <ListProvider type={"otome"}>
            {children}
        </ListProvider>
    )
}