import { platforms_list, languages_list, voiced_list } from "../../utils/dictionary";
import Dropdown from "../OtomesPage/Dropdown"
import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from "react";
import SearchNameInput from '../ui/filters/SearchNameInput'
import Suggestions from "../ui/filters/Suggestions";
import useSetParams from "../../hooks/useSetParams";

export default function FiltersOtomes() {

    const [searchParams, setSearchParams] = useSearchParams()

    const { setParams } = useSetParams()

    let { platforms, languages, original_languages, voice, age, sort } = useMemo(() => ({
        platforms: searchParams.getAll('platform') ?? [],
        languages: searchParams.getAll('lang') ?? [],
        original_languages: searchParams.getAll('original_lang') ?? [],
        voice: searchParams.getAll('voice') ?? [],
        age: Number(searchParams.get('age') ?? 0),
        sort: searchParams.get('sort') ?? 'votecount reverse'
    }), [searchParams])

    const ages = [0, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [range, setRange] = useState(age)

    const setAge = (age) => setSearchParams(prev => {
        prev.delete('age')
        prev.append('age', age)
        return prev
    })

    return <div>

        <SearchNameInput />

        <label htmlFor="sort">Ordenar por</label>
        <select onChange={(e) => setParams('sort', e.target.value)} value={sort} id="sort" name="sort">
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

        <Dropdown data={languages_list} label={'Languages'} param={'lang'} query={languages} />

        <Dropdown data={languages_list} label={'Original Language'} param={'original_lang'} query={original_languages} />

        <Dropdown data={voiced_list} label={'Voiced'} param={'voice'} query={voice} />

        <label htmlFor="age">Age Rating</label>
        <p>+{ages[range]}</p>
        <input
            type="range"
            id="age" name="age"
            min={0}
            max={ages.length - 1}
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            onMouseUp={() => setAge(ages[range])}
            onTouchEnd={() => setAge(ages[range])}
        />

        <label htmlFor="tags">Tags</label>
        <Suggestions endpoint={'tag'} />

    </div>
}