export default function buildFilters(values) {

    const { name, plat, voice, lang, originalLang, age } = values

    const filters = ['and', ["tag", "=", "g542"]]

    // Nombre
    if (name) filters.push(["search", "=", name]);

    // Plataformas
    if (plat.length > 0) {
        const platforms = ['or', ...plat.map(p => ['platform', '=', p])];
        filters.push(platforms);
    }

    // Doblaje
    if (voice.length > 0) {
        const voiced = ['release', '=', ['or', ...voice.map(v => ['voiced', '=', v])]];
        filters.push(voiced);
    }

    // Lenguaje
    if (lang.length > 0) lang.forEach(l => filters.push(['lang', '=', l]))

    // Lenguaje original
    if (originalLang.length > 0) originalLang.forEach(l => filters.push(['olang', '=', l]))

    // Edad
    if (age) filters.push(['release', '=', ['minage', '=', age]])

    return filters
}