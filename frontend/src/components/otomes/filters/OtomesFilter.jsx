import { useSearchParams } from 'react-router-dom'
import useOtomesParams from "../../../hooks/otomes/useOtomesParams"
import NameFilter from './NameFilter'
import SortFilter from './SortFilter'
import Dropdown from './Dropdown'
import AgeFilter from './AgeFilter'
import TagsFilter from './TagsFilter'

const VOICED = [
    { id: 1, label: 'Not voiced' },
    { id: 3, label: 'Partially voiced' },
    { id: 4, label: 'Fully voiced' }
]

export default function OtomesFilter({ schema }) {

    const [searchParams, setSearchParams] = useSearchParams()

    const { platforms, languages, original_languages, sort, name, age, voice } = useOtomesParams()

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

    return (
        <div>
            <NameFilter name={name} setSearchParams={setSearchParams} />

            <SortFilter sort={sort} setParams={setParams} />

            <label htmlFor="platform">Platforms</label>
            <Dropdown data={schema.platform} param={'platform'} query={platforms} setParams={setParams} />

            <label htmlFor="lang">Language</label>
            <Dropdown data={schema.language} param={'lang'} query={languages} setParams={setParams} />

            <label htmlFor="original_lang">Original Language</label>
            <Dropdown data={schema.language} param={'original_lang'} query={original_languages} setParams={setParams} />

            <label>Voiced</label>
            <Dropdown data={VOICED} param={'voice'} query={voice} setParams={setParams} />

            <AgeFilter age={age} setSearchParams={setSearchParams} />
            <TagsFilter setParams={setParams} searchParams={searchParams} setSearchParams={setSearchParams} />
        </div>
    )
}
