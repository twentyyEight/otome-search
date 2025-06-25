import axios from "axios";

const API = 'https://api.vndb.org/kana'
let query = { filters: null, fields: null, results: 100, page: null }

export const getAllVisualNovels = async (filters, page) => {

    query.filters = filters
    query.fields = "id, title, image.url"
    query.page = page

    const vn = await axios.post(`${API}/vn`, query)

    return vn
}

export const getVisualNovel = async (id) => {

    query.filters = ['id', '=', id]
    query.fields = "title, id, description, image.url, developers.name"
    const vn = await axios.post(`${API}/vn`, query)

    const releases = await getReleases(id)

    return [vn.data.results[0], releases]

}

const getReleases = async (id) => {

    query.filters = ["vn", "=", ["id", "=", id]]
    query.fields = "id, title, languages.lang, platforms, released, voiced, extlinks.url, extlinks.name, notes"
    const releases_list = await axios.post(`${API}/release`, query)

    return releases_list.data.results
}