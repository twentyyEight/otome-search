import { useSearchParams } from 'react-router-dom'

export default function useSetParams() {
    const [searchParams, setSearchParams] = useSearchParams()

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

    return { searchParams, setParams }
}