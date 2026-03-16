import { PiSortAscendingBold } from "react-icons/pi";
import { platforms, languages, voiced } from "../../utils/filters/dictionary";
import Dropdown from "./Dropdown"
import { useState, useEffect } from "react";

export default function FiltersOtomes({ setFilters }) {

    const [sort, setSort] = useState('votecount') // Ordenar por
    const [reverse, setReverse] = useState(true) // Cambia orden de los resultados
    const [name, setName] = useState('') // Nombre del otome 
    const [plat, setPlat] = useState([]) // Plataformas
    const [lang, setLang] = useState([]) // Lenguaje
    const [originalLang, setOriginalLang] = useState([]) // Lenguaje original
    const [voice, setVoice] = useState([]) // Doblaje
    const [age, setAge] = useState(0)

    useEffect(() => {
        setFilters({ sort, reverse, plat, lang, originalLang, voice, name, age })
    }, [sort, reverse, plat, lang, originalLang, voice, name, setFilters, age])

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

        <Dropdown data={platforms} setData={setPlat} label={'Plataformas'} />

        <Dropdown data={languages} setData={setLang} label={'Lenguajes'} />

        <Dropdown data={languages} setData={setOriginalLang} label={'Lenguaje Original'} />

        <Dropdown data={voiced} setData={setVoice} label={'Doblaje'} />

        <label>Edad</label>
        <p>{age}</p>
        <input
            type="range"
            min={0}
            max={18}
            value={age}
            onChange={(e) => setAge(e.target.value)}
        />
    </div>
}