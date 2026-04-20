import SearchNameInput from '../ui/filters/SearchNameInput'
import Checkbox from '../ui/filters/Checkbox'
import Suggestions from '../ui/filters/Suggestions'

export default function FiltersCharacters() {

    const ROLES = [
        { value: 'main', label: 'Protagonist' },
        { value: 'primary', label: 'Main Character' },
        { value: 'side', label: 'Side Character' },
        { value: 'appears', label: 'Makes an appearance' },
    ]

    const SEX = [
        { value: 'unknown', label: 'Unknown' },
        { value: 'm', label: 'Male' },
        { value: 'f', label: 'Female' },
        { value: 'b', label: 'Both' },
        { value: 'n', label: 'Sexless' },
    ]

    return <>
        <SearchNameInput />

        <fieldset>
            <legend>Role</legend>
            {ROLES.map(({ value, label }) => (
                <Checkbox key={crypto.randomUUID()} param_name={"role"} value={value} label={label} />
            ))}
        </fieldset>

        <fieldset>
            <legend>Sex</legend>
            {SEX.map(({ value, label }) => (
                <Checkbox key={crypto.randomUUID()} param_name={"sex"} value={value} label={label} />
            ))}
        </fieldset>

        <label htmlFor="traits">Traits</label>
        <Suggestions endpoint={'trait'} />
    </>
}