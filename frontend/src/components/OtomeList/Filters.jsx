import { PiSortAscendingBold } from "react-icons/pi";
import { platforms, languages, voiced } from "../../utils/filters/dictionary";
import Dropdown from "./Dropdown"
import { useState, useEffect } from "react";

export default function Filters({ setFilters }) {

    const [sort, setSort] = useState('votecount') // Ordenar por
    const [reverse, setReverse] = useState(true) // Cambia orden de los resultados
    const [name, setName] = useState('') // Nombre del otome 
    const [plat, setPlat] = useState([]) // Plataformas
    const [lang, setLang] = useState([]) // Lenguaje
    const [originalLang, setOriginalLang] = useState([]) // Lenguaje original
    const [voice, setVoice] = useState([]) // Doblaje

    useEffect(() => {
        setFilters({ sort, reverse, plat, lang, originalLang, voice, name })
    }, [sort, reverse, plat, lang, originalLang, voice, name, setFilters])

    return <div>

        <input
            type="text"
            placeholder="Buscar por nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <label>Ordenar por</label>
        <select onChange={(e) => setSort(e.target.value)}>
            <option value="votecount">Popularidad</option>
            <option value="title">Título</option>
            <option value="released">Fecha de lanzamiento</option>
            <option value="rating">Evaluación</option>
        </select>
        <PiSortAscendingBold onClick={() => setReverse(!reverse)} />

        <label>Plataformas</label>
        <Dropdown data={platforms} setData={setPlat} />

        <label>Lenguaje</label>
        <Dropdown data={languages} setData={setLang} />

        <label>Lenguaje original</label>
        <Dropdown data={languages} setData={setOriginalLang} />

        <label>Doblaje</label>
        <Dropdown data={voiced} setData={setVoice} />
    </div>
}