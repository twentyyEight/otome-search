export default async function apiFetchSchema() {
    try {
        const res = await fetch(`https://api.vndb.org/kana/schema`)
        const data = await res.json()

        if (!res.ok) throw new Error(data.message)

        return data

    } catch (error) {
        console.error(error)
        throw error
    }
}