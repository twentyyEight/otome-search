export default async function apiFetch(endpoint, body) {

    const res = await fetch(`https://api.vndb.org/kana/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await res.json()

    if (!res.ok) throw new Error(data.message)

    return data
}