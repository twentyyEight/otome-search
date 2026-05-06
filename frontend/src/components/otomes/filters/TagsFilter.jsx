import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import useSuggestions from "../../../hooks/useSuggestions"

export default function TagsFilter({ setParams, searchParams, setSearchParams }) {

    const location = useLocation()

    const [suggestion, setSuggestion] = useState('')
    const [tags, setTags] = useState(() => {
        return JSON.parse(sessionStorage.getItem('selectedTags')) || []
    })

    const { suggestions, loading, error } = useSuggestions(suggestion)

    const addTag = (tag) => {
        setParams('tag', `g${tag.id}`)
        sessionStorage.setItem('selectedTags', JSON.stringify([{ id: tag.id, name: tag.name }]))
        setSuggestion('')
    }

    const removeTag = (id) => {
        searchParams.delete('tag', 'g' + id)
        setSearchParams(searchParams)

        const updated = tags.filter(tag => tag.id !== id);
        setTags(updated)
        sessionStorage.setItem('selectedTags', JSON.stringify(updated));
    }

    return (
        <div>
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
                        <li key={item.id} onClick={() => addTag(item)}>{item.name}</li>
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
                {tags && tags.length > 0 &&
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