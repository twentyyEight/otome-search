import { useState } from "react";
import { useSearchParams } from 'react-router-dom'

export default function Dropdown({ data, label, param }) {

    const [_, setSearchParams] = useSearchParams()

    // Buscar opciones por su nombre
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = Object.entries(data).filter(([f]) =>
        f.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Guardado de las opciones en un array - Elimina el dato si es que ya está guardado
    const toggle = (value) => {
        setSearchParams(prev => {
            const current = prev.getAll(param)

            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value]

            prev.delete(param)
            updated.forEach(v => prev.append(param, v))

            return prev
        })
    }

    return <div>

        <label>{label}</label>

        {/* Búsqueda de las opciones */}
        {label !== 'Doblaje' &&
            <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        }

        {/* Opciones */}
        <div>
            {searchResults.map(([alias, name]) => (

                <div key={crypto.randomUUID()}>

                    <label htmlFor={alias}>{name}</label>

                    <input type="checkbox"
                        name={alias}
                        onChange={() => toggle(alias)}
                    />
                </div>
            ))}
        </div>
    </div>
}