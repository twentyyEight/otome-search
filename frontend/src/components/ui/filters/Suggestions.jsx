import useSetParams from "../../../hooks/useSetParams";
import useSuggestions from "../../../hooks/useSuggestions";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom'
import useSelectionName from "../../../hooks/useSelectionName";

export default function Suggestions({ endpoint, items }) {

    const [input, setInput] = useState('')

    const { suggestions, loading: suggestions_loading, error: suggestions_error } = useSuggestions(input, `${endpoint}s`)

    const { selections, loading: selections_loading, error: selections_error } = useSelectionName(items)

    /* AGREGA ID DE SUGERENCIA A URL */
    const { setParams } = useSetParams()

    const handleSuggestion = (item) => {

        setParams(endpoint, `${item.id}`)
        setInput('')
    }

    /* ELIMINAR SUGERENCIA SELECCIONADA */
    const [_, setSearchParams] = useSearchParams()

    const removeSelection = (value) => {

        setSearchParams(prev => {
            const values = prev.getAll(endpoint)
            prev.delete(endpoint)
            values.filter(v => v !== value).forEach(v => prev.append(endpoint, v))
            return prev
        })
    }

    return (
        <>
            {/* BÚSQUEDA DE SUGERENCIAS */}
            <input
                type="text" id={`${endpoint}s`} name={`${endpoint}s`}
                placeholder={`Type ${endpoint} name...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            {/* SUGERENCIAS SELECCIONADAS */}
            <div>
                {selections_loading && <p>Loading names...</p>}
                {selections_error && <p>Error getting names</p>}
                {selections.map(selection =>
                    <div key={selection.id}>
                        <p>{selection.name}</p>
                        <p onClick={() => removeSelection(selection.id)}>X</p>
                    </div>
                )}
            </div>

            {/* RESULTADOS SUGERENCIAS */}
            {suggestions_loading && <p>Loading suggestions...</p>}
            {suggestions_error && <p>Error searching suggestions</p>}
            {!suggestions_loading && !suggestions_error && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((item) => (
                        <li key={item.id} onClick={() => handleSuggestion(item)}>{item.name}</li>
                    ))}
                </ul>
            )}
        </>
    )
}