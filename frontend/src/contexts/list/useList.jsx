import { useContext } from "react";
import { ListContext } from "./ListContext";

export function useList() {
    return useContext(ListContext)
}