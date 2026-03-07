import { useState } from "react";

export default function Dropdown({ data, setData }) {

    // Buscar opciones por su nombre
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = Object.entries(data).filter(([f]) =>
        f.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Guardado de las opciones en un array - Elimina el dato si es que ya está guardado
    const toggle = (value) => {
        setData(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        )
    }

    return <div>

        {/* Búsqueda de las opciones */}
        <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Opciones */}
        <div>
            {searchResults.map(([alias, name]) => (

                <div key={crypto.randomUUID()}>

                        <label htmlFor={alias}>{name}</label>

                        <input type="checkbox"
                            value={alias}
                            name={alias}
                            onChange={() => toggle(alias)} 
                        />
                </div>
            ))}
        </div>
    </div>
}