import { useState } from 'react'
import useSuggestions from '../../hooks/useSuggestions'
import { useSearchParams } from 'react-router-dom'

export default function FiltersCharacters() {

    const [input, setInput] = useState('')
    const { suggestions, loading, error } = useSuggestions(input)
    const [_, setSearchParams] = useSearchParams()

    const setName = (value) => setSearchParams(prev => {
        prev.set('name', value)
        prev.set('page', 1)
        return prev
    })

    const setParams = (key, value) => setSearchParams(prev => {
        const values = prev.getAll(key)

        if (values.includes(value)) {
            prev.delete(key)
            values.filter(v => v !== value).forEach(v => prev.append(key, v))
        } else {
            prev.append(key, value)
        }

        return prev
    })

    return <>
        <input
            type="text"
            placeholder='Search character by name...'
            onChange={(e) => setName(e.target.value)} />

        <fieldset>
            <legend>Role</legend>
            <label>
                <input
                    type="checkbox"
                    name="role"
                    value="main"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Protagonist
            </label>
            <label>
                <input
                    type="checkbox"
                    name="role"
                    value="primary"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Main character
            </label>
            <label>
                <input
                    type="checkbox"
                    name="role"
                    value="side"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Side character
            </label>
            <label>
                <input
                    type="checkbox"
                    name="role"
                    value="appears"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Makes an appearance
            </label>
        </fieldset>

        <fieldset>
            <legend>Sex</legend>
            <label>
                <input
                    type="checkbox"
                    name="sex"
                    value="unknown"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Unknown
            </label>
            <label>
                <input
                    type="checkbox"
                    name="sex"
                    value="m"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Male
            </label>
            <label>
                <input
                    type="checkbox"
                    name="sex"
                    value="f"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Female
            </label>
            <label>
                <input
                    type="checkbox"
                    name="sex"
                    value="b"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Both
            </label>
            <label>
                <input
                    type="checkbox"
                    name="sex"
                    value="n"
                    onChange={(e) => setParams(e.target.name, e.target.value)}
                />
                Sexless
            </label>
        </fieldset>

        <label htmlFor="traits">Traits</label>
        <input
            type="text" id="traits"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type trait name..."
        />

        {loading && <p>Loading suggestions...</p>}
        {error && <p>Error searching suggestions</p>}
        {!loading && !error && suggestions.length > 0 && (
            <ul>
                {suggestions.map((item) => (
                    <li key={item.id} onClick={() => setParams('trait', `i${item.id}`)}>{item.name}</li>
                ))}
            </ul>
        )}
    </>
}