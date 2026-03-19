import { platforms, languages, voiced } from "../../utils/filters/dictionary";
import Dropdown from "./Dropdown"
import { useSearchParams } from 'react-router-dom'

export default function FiltersOtomes() {

    const [searchParams, setSearchParams] = useSearchParams()

    const age = Number(searchParams.get('age') ?? 0)

    const setParam = (key, value) => setSearchParams(prev => {
        prev.set(key, value)
        return prev
    })

    return <div>

        <input
            type="text"
            placeholder="Buscar por nombre..."
            onChange={(e) => setParam('name', e.target.value)}
        />

        <label>Ordenar por</label>
        <select onChange={(e) => setParam('sort', e.target.value)}>
            <option value="votecount reverse">Más populares</option>
            <option value="votecount">Menos populares</option>
            <option value="title">Título (A-Z)</option>
            <option value="title reverse">Título (Z-A)</option>
            <option value="released reverse">Recientes</option>
            <option value="released">Antiguos</option>
            <option value="rating reverse">Mejor evaluados</option>
            <option value="rating">Peor evaluados</option>
        </select>

        <Dropdown data={platforms} label={'Plataformas'} param={'platform'} />

        <Dropdown data={languages} label={'Lenguajes'} param={'language'} />

        <Dropdown data={languages} label={'Lenguaje Original'} param={'original_language'} />

        <Dropdown data={voiced} label={'Doblaje'} param={'voice'} />

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