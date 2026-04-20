import SearchNameInput from '../ui/filters/SearchNameInput'
import Checkbox from '../ui/filters/Checkbox'

export default function FiltersTags() {

    const TAG_TYPES = [
        { value: 'cont', label: 'Content' },
        { value: 'tech', label: 'Technical' },
        { value: 'ero', label: 'Ero' }
    ]

    return <>
        <SearchNameInput />

        <fieldset>
            <legend>Type</legend>

            {TAG_TYPES.map(({ value, label }) => (
                <Checkbox key={crypto.randomUUID()} param_name={'type'} value={value} label={label} />
            ))}
        </fieldset>
    </>
}