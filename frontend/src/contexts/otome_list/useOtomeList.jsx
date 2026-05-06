import { useContext } from "react";
import { OtomeListContext } from "./OtomeListContext";

export function useOtomeList() {
    return useContext(OtomeListContext)
}