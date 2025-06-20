import axios from "axios";

const API = 'https://api.vndb.org/kana'
let query = { filters: null, fields: null, results: 100, page: null }

export const getAllVisualNovels = async (filters, fields, page) => {

    query.filters = filters
    query.fields = fields
    query.page = page

    const res = await axios.post(`${API}/vn`, query)

    return res
}

export const getVisualNovel = async (id) => {

    query.filters = ['id', '=', id]
    query.fields = "title, id, description, image.url"
    const vn = await axios.post(`${API}/vn`, query)

    const releases = await getReleaseInfo(id)

    return [vn.data.results[0], releases]

}

const getAllReleases = async (id) => {

    query.filters = ["vn", "=", ["id", "=", id]]
    query.fields = "id"
    const releases_list = await axios.post(`${API}/release`, query)

    return releases_list.data.results
}

const getReleaseInfo = async (id) => {

    const releases_list = await getAllReleases(id)

    const releases = []

    for (let r in releases_list) {

        const release = releases_list[r]

        query.filters = ['id', '=', release.id]
        query.fields = "title, languages.lang, platforms, released, voiced, extlinks.url, extlinks.name, notes"
        const release_info = await axios.post(`${API}/release`, query)

        releases.push(release_info.data.results[0])
    }

    return releases

}