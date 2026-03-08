export default async function apiFetch(param, query) {

    try {
        const res = await fetch(`https://api.vndb.org/kana/${param}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
        });

        const data = await res.json()
        return data

    } catch (error) {
        console.error(error)
        return error
    }
}