import useAllOtomes from "../hooks/useAllOtomes"
import Pagination from "../components/OtomeList/Pagination";
import Filters from "../components/OtomeList/Filters";
import { useSearchParams } from 'react-router-dom'
import { useState } from "react";

export default function OtomeList() {

    const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL
    const page = Number(searchParams.get('page') ?? 1) // Obtiene 'page' del parametro de la URL

    const [filters, setFilters] = useState({
        sort: 'votecount',
        reverse: true,
        name: '',
        plat: [],
        lang: [],
        originalLang: [],
        voice: []
    })

    const { otomes, total } = useAllOtomes(page, filters) // Obtiene los otomes y el n° total de páginas

    return <>
        <h1>Otomes</h1>

        {/* FILTROS */}
        <Filters setFilters={setFilters} />

        {/* LISTADO OTOMES */}
        {otomes.map(otome => (

            <div key={otome.id}>
                <img src={otome.image?.url} alt={otome.title} />
                <h2>{otome.title}</h2>
            </div>
        ))}

        {/* PAGINACIÓN */}
        {total > 1 && <Pagination page={page} total={total} setSearchParams={setSearchParams} />}
    </>
}