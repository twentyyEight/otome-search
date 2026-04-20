import { useSearchParams } from 'react-router-dom'

export default function Checkbox({ param_name, value, label }) {

    const [searchParams, setSearchParams] = useSearchParams()

    const param = searchParams.getAll(param_name) ?? ''

    const setCheckbox = (value) => setSearchParams(prev => {
        const values = prev.getAll(param_name)

        if (values.includes(value)) {
            prev.delete(param_name)
            values.filter(v => v !== value).forEach(v => prev.append(param_name, v))
        } else {
            prev.append(param_name, value)
        }

        return prev
    })

    return (
        <>
            <input
                type="checkbox" name={value} id={value}
                value={value}
                checked={param?.includes(value)}
                onChange={() => setCheckbox(value)} />
                
            <label htmlFor="cont">{label}</label>
        </>
    )
}