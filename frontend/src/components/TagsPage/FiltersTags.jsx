import { useState, useEffect } from "react";

export default function FiltersTags({ setFilters }) {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {

        setFilters({ name, category })

    }, [name, category, setFilters])

    return <>
        <input
            type="text"
            name="filter_name"
            placeholder="Buscar filtro"
            value={name}
            onChange={(e) => setName(e.target.value)} />

        <label htmlFor="category">Categoria</label>
        <select id="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todos</option>
            <option value={"cont"}>Contenido</option>
            <option value={"tech"}>Técnico</option>
        </select>
    </>

}