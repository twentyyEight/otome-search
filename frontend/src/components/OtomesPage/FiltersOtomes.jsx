import { useState } from 'react'
import { useSearchParams, Link, useLocation } from 'react-router-dom'
import useOtomesParams from "../../hooks/otomes/useOtomesParams"
import useSetParams from '../../hooks/useSetParams'
import useSuggestions from '../../hooks/useSuggestions'
import Dropdown from './Dropdown'

const VOICED = [
    { id: 1, label: 'Not voiced' },
    { id: 3, label: 'Partially voiced' },
    { id: 4, label: 'Fully voiced' }
]

const AGES = [0, 3, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

export default function FiltersOtomes({ schema }) {

    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()

    const [suggestion, setSuggestion] = useState('')

    const { platforms, languages, original_languages, sort, name, age, voice } = useOtomesParams()
    const { suggestions, loading, error } = useSuggestions(suggestion)
    const setParams = useSetParams()

    const [range, setRange] = useState(AGES.findIndex(a => a === age))

    const setAge = (age) => setSearchParams(prev => {
        prev.set('age', age)
        return prev
    })

    const setName = (value) => setSearchParams(prev => {
        prev.set('name', value)
        prev.set('page', 1)
        return prev
    })

    const tags = JSON.parse(sessionStorage.getItem('selectedTags')) || []

    const removeTag = (id) => {
        searchParams.delete('tag', 'g' + id)
        setSearchParams(searchParams)

        const updated = tags.filter(tag => tag.id !== id);
        sessionStorage.setItem('selectedTags', JSON.stringify(updated));
    }

    const addSuggestion = (item) => {

        setParams('tag', `g${item.id}`)
        sessionStorage.setItem('selectedTags', JSON.stringify([{ id: item.id, name: item.name }]))
        setSuggestion('')
    }

    return (
        <div>
            <input
                type="text" name="tag_name"
                placeholder="Search by name..."
                value={name}
                onChange={(e) => setName(e.target.value)} />

            <label htmlFor="sort">Sort</label>
            <select onChange={(e) => setParams('sort', e.target.value)} value={sort} id="sort" name="sort">
                <option value="votecount reverse">Most popular</option>
                <option value="votecount">Least popular</option>
                <option value="title">A-Z</option>
                <option value="title reverse">Z-A</option>
                <option value="released reverse">Newest</option>
                <option value="released">Oldest</option>
                <option value="rating reverse">Best rating</option>
                <option value="rating">Worst rating</option>
            </select>

            <label htmlFor="platform">Platforms</label>
            <Dropdown data={schema.platform} param={'platform'} query={platforms} />

            <label htmlFor="lang">Language</label>
            <Dropdown data={schema.language} param={'lang'} query={languages} />

            <label htmlFor="original_lang">Original Language</label>
            <Dropdown data={schema.language} param={'original_lang'} query={original_languages} />

            <label>Voiced</label>
            <Dropdown data={VOICED} param={'voice'} query={voice} />

            <label htmlFor="age">Age Rating</label>
            <p>+{AGES[range]}</p>
            <input
                type="range"
                id="age"
                min={0}
                max={AGES.length - 1}
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                onMouseUp={() => setAge(AGES[range])}
                onTouchEnd={() => setAge(AGES[range])}
            />

            <label htmlFor="tags">Tags</label>
            <input
                type="text"
                id="tags"
                placeholder="Search tag name..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)} />

            {loading && <p>Loading suggestions</p>}
            {error && <p>Error searching suggestions</p>}
            {!loading && !error && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((item) => (
                        <li key={item.id} onClick={() => addSuggestion(item)}>{item.name}</li>
                    ))}
                </ul>
            )}


            <Link
                to={`/tags`}
                state={{ background: location }}
            >
                Browse all tags
            </Link>

            <div>
                {tags &&
                    tags.map(tag => {
                        return <div className="flex space-x-2" key={tag.id}>
                            <p>{tag.name}</p>
                            <p onClick={() => removeTag(tag.id)}>X</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
