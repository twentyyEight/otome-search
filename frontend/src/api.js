export default async function apiFetch(filters, fields) {

    try {
        const res = await fetch("https://api.vndb.org/kana/vn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filters,
                fields,
                "results": 100,
                "page": 1,
            }),
        });

        const data = await res.json()
        return data

    } catch (error) {
        console.error(error)
    }
}