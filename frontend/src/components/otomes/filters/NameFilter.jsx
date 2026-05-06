export default function NameFilter({ name, setSearchParams }) {

    const setName = (value) => setSearchParams(prev => {
        prev.set('name', value)
        prev.set('page', 1)
        return prev
    })

    return (
        <input
            type="text" name="tag_name"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)} />
    )
}