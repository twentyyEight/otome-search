export default function FiltersTags({ setSearchParams }) {

    const setParam = (key, value) => setSearchParams(prev => {
        prev.set(key, value)
        return prev
    })

    return <>
        <input
            type="text"
            name="filter_name"
            placeholder="Buscar filtro"
            onChange={(e) => setParam('name', e.target.value)} />

        <label htmlFor="category">Categoria</label>
        <select id="category" onChange={(e) => setParam('category', e.target.value)}>
            <option value="">Todos</option>
            <option value={"cont"}>Contenido</option>
            <option value={"tech"}>Técnico</option>
        </select>
    </>

}