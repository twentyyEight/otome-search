export default async function apiFetch(query) {

    try {
        const res = await fetch("https://api.vndb.org/kana/vn", {
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
    }
}