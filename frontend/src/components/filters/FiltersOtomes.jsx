import { useSearchParams } from 'react-router-dom'
import useOtomesParams from "../../hooks/otomes/useOtomesParams"
import useSetParams from '../../hooks/useSetParams'
import Dropdown from './Dropdown'
import { useState } from 'react'

export default function FiltersOtomes({ schema }) {

    const [, setSearchParams] = useSearchParams()

    const { platforms, languages, original_languages, sort, name, age, voice } = useOtomesParams()
    const setParams = useSetParams()

    const { enums } = schema

    const VOICED = [
        { id: 1, label: 'Not voiced' },
        { id: 3, label: 'Partially voiced' },
        { id: 4, label: 'Fully voiced' }
    ]
    const ages = [0, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const [range, setRange] = useState(ages.findIndex(a => a === age))

    const setAge = (age) => setSearchParams(prev => {
        prev.delete('age')
        prev.append('age', age)
        return prev
    })

    const setName = (value) => setSearchParams(prev => {
        prev.set('name', value)
        prev.set('page', 1)
        return prev
    })

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
        </div>
    )
}