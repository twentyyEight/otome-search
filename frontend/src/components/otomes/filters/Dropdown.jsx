import { useState } from "react"

export default function Dropdown({ data, param, query, setParams }) {

    // Buscar opciones por su nombre
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = data.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            {/* Búsqueda de las opciones */}
            {param !== 'voice' &&
                <input
                    id={param} name={param}
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            }

            {/* Opciones */}
            {searchResults.map((data) => (

                <div key={crypto.randomUUID()}>

                    <input type="checkbox"
                        name={data.id} id={data.id}
                        checked={query.includes(String(data.id))}
                        onChange={() => setParams(param, data.id)}
                    />

                    <label htmlFor={data.id}>{data.label}</label>
                </div>
            ))}
        </>
    )
}