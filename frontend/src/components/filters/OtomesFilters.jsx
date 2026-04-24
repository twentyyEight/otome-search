import Dropdown from "../OtomesPage/Dropdown"
import { useSearchParams } from 'react-router-dom'
import { useState } from "react";
import SearchNameInput from '../ui/filters/SearchNameInput'
import Suggestions from "../ui/filters/Suggestions";
import useSetParams from "../../hooks/useSetParams";
import useApiSchema from "../../hooks/useApiSchema";
import useOtomesParams from "../../hooks/otomes/useOtomesParams";
import Loading from '../ui/Loading'
import Error from '../ui/Error'

export default function FiltersOtomes() {

    const [_, setSearchParams] = useSearchParams()

    const { setParams } = useSetParams()
    const { schema: { enums }, loading, error } = useApiSchema()
    const { params: { platforms, languages, original_languages, voice, age, tags, sort } } = useOtomesParams()

    const VOICED = [
        { id: 1, label: 'Not voiced' },
        { id: 3, label: 'Partially voiced' },
        { id: 4, label: 'Fully voiced' }
    ]
    const ages = [0, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [range, setRange] = useState(age)

    const setAge = (age) => setSearchParams(prev => {
        prev.delete('age')
        prev.append('age', age)
        return prev
    })

    if (loading) return <Loading />
    if (error) return <Error />

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

        <label htmlFor="platform">Platforms</label>
        <Dropdown data={enums.platform} param={'platform'} query={platforms} />

        <label htmlFor="lang">Language</label>
        <Dropdown data={enums.language} param={'lang'} query={languages} />

        <label htmlFor="original_lang">Original Language</label>
        <Dropdown data={enums.language} param={'original_lang'} query={original_languages} />

        <label>Voiced</label>
        <Dropdown data={VOICED} param={'voice'} query={voice} />

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
        <Suggestions endpoint={'tag'} items={tags} />

    </div>
}