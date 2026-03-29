import { useSearchParams } from 'react-router-dom'

export default function FiltersTags() {

    const [searchParams, setSearchParams] = useSearchParams() // Obtiene y modifica parametros URL

    const name = searchParams.get('name') ?? ''
    const type = searchParams.getAll('type') ?? ''

    const setName = (key, value) => setSearchParams(prev => {
        prev.set(key, value)
        prev.set('page', 1)
        return prev
    })

    const setType = (key, value) => setSearchParams(prev => {
        const values = prev.getAll(key)

        if (values.includes(value)) {
            prev.delete(key) // borra todos
            values.filter(v => v !== value).forEach(v => prev.append(key, v)) // reagrega los que quedan
        } else {
            prev.append(key, value) // agrega el nuevo
        }

        return prev
    })

    return <>
        <input
            type="text" name="tag_name"
            placeholder="Search tag by name..."
            value={name}
            onChange={(e) => setName('name', e.target.value)} />

        <p>Type</p>
        <input
            type="checkbox" name="cont" id="cont"
            value={"cont"}
            checked={type?.includes('cont')}
            onChange={() => setType('type', 'cont')} />
        <label htmlFor="cont">Content</label>

        <input
            type="checkbox" name="tech" id="tech"
            value={"tech"}
            checked={type?.includes('tech')}
            onChange={() => setType('type', 'tech')} />
        <label htmlFor="tech">Technical</label>

        <input
            type="checkbox" name="ero" id="ero"
            value={"ero"}
            checked={type?.includes('ero')}
            onChange={() => setType('type', 'ero')} />
        <label htmlFor="ero">Ero</label>
    </>
}