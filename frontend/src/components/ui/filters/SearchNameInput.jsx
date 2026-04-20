import { useSearchParams } from 'react-router-dom'

export default function SearchNameInput() {

    const [searchParams, setSearchParams] = useSearchParams()

    const name = searchParams.get('name') ?? ''

    const setName = (value) => setSearchParams(prev => {
        prev.set('name', value)
        prev.set('page', 1)
        return prev
    })

    return <input
        type="text" name="tag_name"
        placeholder="Search by name..."
        value={name}
        onChange={(e) => setName(e.target.value)} />

}