import { platforms_list, languages_list, voiced_list } from "../../utils/filters/dictionary";
import Dropdown from "./Dropdown"
import { useSearchParams } from 'react-router-dom'
import useParamsFilters from "../../hooks/useParamsFilters";

export default function FiltersOtomes() {

    const [_, setSearchParams] = useSearchParams()
    const filters = useParamsFilters()
    const { name, platforms, languages, original_languages, voice, age, sort } = filters

    const setParam = (key, value) => setSearchParams(prev => {
        prev.set(key, value)
        return prev
    })

    return <div>

        <input
            type="text"
            placeholder="Buscar por nombre..."
            value={name}
            onChange={(e) => setParam('name', e.target.value)}
        />

        <label>Ordenar por</label>
        <select onChange={(e) => setParam('sort', e.target.value)} value={sort}>
            <option value="votecount reverse">Más populares</option>
            <option value="votecount">Menos populares</option>
            <option value="title">Título (A-Z)</option>
            <option value="title reverse">Título (Z-A)</option>
            <option value="released reverse">Recientes</option>
            <option value="released">Antiguos</option>
            <option value="rating reverse">Mejor evaluados</option>
            <option value="rating">Peor evaluados</option>
        </select>

        <Dropdown data={platforms_list} label={'Platforms'} param={'platform'} query={platforms} />

        <Dropdown data={languages_list} label={'Languages'} param={'language'} query={languages} />

        <Dropdown data={languages_list} label={'Original Language'} param={'original_language'} query={original_languages} />

        <Dropdown data={voiced_list} label={'Voiced'} param={'voice'} query={voice} />

        <label>Edad</label>
        <p>{age}</p>
        <input
            type="range"
            min={0}
            max={18}
            value={age}
            onChange={(e) => setParam('age', e.target.value)}
        />
    </div>
}