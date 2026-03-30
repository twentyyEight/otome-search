import { useSearchParams } from 'react-router-dom'

export default function FiltersTags() {

    const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL

    const name = searchParams.get('name') ?? ''
    const types = searchParams.getAll('type') ?? ''

    const setName = (value) => setSearchParams(prev => {
        prev.set('name', value)
        prev.set('page', 1)
        return prev
    })

    const setType = (value) => setSearchParams(prev => {
        const values = prev.getAll('type')

        if (values.includes(value)) {
            prev.delete('type') // borra todos
            values.filter(v => v !== value).forEach(v => prev.append('type', v)) // reagrega los que quedan
        } else {
            prev.append('type', value) // agrega el nuevo
        }

        return prev
    })

    return <>
        <input
            type="text" name="tag_name"
            placeholder="Search tag by name..."
            value={name}
            onChange={(e) => setName(e.target.value)} />

        <p>Type</p>
        <input
            type="checkbox" name="cont" id="cont"
            value={"cont"}
            checked={types?.includes('cont')}
            onChange={() => setType('cont')} />
        <label htmlFor="cont">Content</label>

        <input
            type="checkbox" name="tech" id="tech"
            value={"tech"}
            checked={types?.includes('tech')}
            onChange={() => setType('tech')} />
        <label htmlFor="tech">Technical</label>

        <input
            type="checkbox" name="ero" id="ero"
            value={"ero"}
            checked={types?.includes('ero')}
            onChange={() => setType('ero')} />
        <label htmlFor="ero">Ero</label>
    </>
}