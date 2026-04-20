import useSetParams from "../../../hooks/useSetParams";
import useSuggestions from "../../../hooks/useSuggestions";
import { useState } from "react";


export default function Suggestions({ endpoint }) {

    const [input, setInput] = useState('')

    const { suggestions, loading, error } = useSuggestions(input, `${endpoint}s`)
    const { setParams } = useSetParams()

    return (
        <>
            <input
                type="text" id={`${endpoint}s`} name={`${endpoint}s`}
                placeholder={`Type ${endpoint} name...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            {loading && <p>Loading suggestions...</p>}
            {error && <p>Error searching suggestions</p>}
            {!loading && !error && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((item) => (
                        <li key={item.id} onClick={() => setParams(endpoint, `${item.id}`)}>{item.name}</li>
                    ))}
                </ul>
            )}
        </>
    )

}