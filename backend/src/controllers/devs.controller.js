import { Developer } from '../models/dev.models.js'

export const getDevs = async (req, res) => {

    /* OBTENCIÓN Y VALIDACIÓN DE QUERIES DE URL */
    let { page, name, lang, type } = req.query

    // Valida que el número sea un entero y mayor a 0
    page = Number(page)
    if (!Number.isFinite(page) || page < 1) page = 1

    // Limpieza de caracteres que podrian producir un ataque regex
    name = (name || '').trim()
    const safe_name = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // evita ataques regex

    const allowed_langs = ["ja", "en", "es", "fr", "ko", "zh-Hans", "zh-Hant", "ru", "de", "pt-br", "pt-pt", "uk", "vi", "ar", "eu", "be", "bg", "ca", "cs", "nl", "fi", "el", "hi", "id", "it", "mk", "ms", "no", "pl", "ro", "ta", "th", "tr"]
    lang = [].concat(lang).filter(l => allowed_langs.includes(l)).slice(0, 33)

    // Evita errores en la consulta por valores invalidos
    const allowed_types = ["co", "in", "ng"]
    type = [].concat(type).filter(t => allowed_types.includes(t)).slice(0, 3)

    /* CONSTRUCCIÓN FILTROS */
    const skip = (page - 1) * 100

    const filters = { name: { $regex: `^${safe_name}`, $options: 'i' } }

    if (lang.length > 0) filters.lang = { $in: lang }

    if (type.length > 0) filters.type = { $in: type }

    /* LLAMADA A BD */
    try {

        const devs = await Developer
            .find(filters)
            .sort({ name: 1 })
            .skip(skip)
            .limit(100)

        const total = await Developer.countDocuments(filters)

        return res.json({ devs, total })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}