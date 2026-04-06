export default async function dbFetch(endpoint, { method = 'GET', body } = {}) {

    const options = {
        method,
        credentials: 'include'
    }

    if (body) {
        options.body = JSON.stringify(body)
        options.headers = { 'Content-Type': 'application/json' }
    }

    try {
        const res = await fetch(`http://localhost:3000/api/${endpoint}`, options)
        const data = await res.json()

        if (!res.ok) throw Error(data.message)
            
        return data
        
    } catch (error) {
        console.error(error)
        throw Error(error.message)
    }
}