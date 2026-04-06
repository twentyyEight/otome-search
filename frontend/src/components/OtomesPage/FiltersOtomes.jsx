import { platforms_list, languages_list, voiced_list } from "../../utils/dictionary";
import Dropdown from "./Dropdown"
import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from "react";
import useSuggestions from "../../hooks/useSuggestions";

export default function FiltersOtomes() {

    const [searchParams, setSearchParams] = useSearchParams()

    const [tag, setTag] = useState('')
    const { suggestions, loading, error } = useSuggestions(tag, 'tags')

    let { name, platforms, languages, original_languages, voice, age, sort } = useMemo(() => ({
        name: searchParams.get('name') ?? '',
        platforms: searchParams.getAll('platform') ?? [],
        languages: searchParams.getAll('lang') ?? [],
        original_languages: searchParams.getAll('original_lang') ?? [],
        voice: searchParams.getAll('voice') ?? [],
        age: Number(searchParams.get('age') ?? 0),
        sort: searchParams.get('sort') ?? 'votecount reverse'
    }), [searchParams])

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

        <Dropdown data={languages_list} label={'Languages'} param={'lang'} query={languages} />

        <Dropdown data={languages_list} label={'Original Language'} param={'original_lang'} query={original_languages} />

        <Dropdown data={voiced_list} label={'Voiced'} param={'voice'} query={voice} />

        <label>Age Rating</label>
        <p>+{age}</p>
        <input
            type="range"
            min={0}
            max={18}
            defaultValue={age}
            onMouseUp={(e) => setParam('age', e.target.value)}
            onTouchEnd={(e) => setParam('age', e.target.value)}
        />

        <label htmlFor="tags">Tags</label>
        <input
            type="text" id="tags"
            placeholder="Type tag name..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
        />

        {loading && <p>Loading suggestions...</p>}
        {error && <p>Error searching suggestions</p>}
        {!loading && !error && suggestions.length > 0 && (
            <ul>
                {suggestions.map((item) => (
                    <li key={item.id} onClick={() => setParam('tag', `g${item.id}`)}>{item.name}</li>
                ))}
            </ul>
        )}

    </div>
}