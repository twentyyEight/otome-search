export default async function apiFetchSchema() {
    const res = await fetch('https://api.vndb.org/kana/schema')

    if (!res.ok) throw new Error(res.statusText)

    return res.json()
}