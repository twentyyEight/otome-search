export default async function apiFetch(endpoint, body) {

    try {
        const res = await fetch(`https://api.vndb.org/kana/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json()

        if (!res.ok) throw new Error(data.message)

        return data

    } catch (error) {
        console.error(error)
        throw error
    }
}