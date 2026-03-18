export default function buildFilters(values, base) {

    const { name, platforms, voice, languages, original_languages, age } = values

    // Nombre
    if (name) base.push(["search", "=", name]);

    // Plataformas
    if (platforms.length > 0) {
        const plats = ['or', ...platforms.map(p => ['platform', '=', p])];
        base.push(plats);
    }

    // Doblaje
    if (voice.length > 0) {
        const voiced = ['release', '=', ['or', ...voice.map(v => ['voiced', '=', v])]];
        base.push(voiced);
    }

    // Lenguaje
    if (languages.length > 0) languages.forEach(l => base.push(['lang', '=', l]))

    // Lenguaje original
    if (original_languages.length > 0) original_languages.forEach(l => base.push(['olang', '=', l]))

    // Edad
    if (age) base.push(['release', '=', ['minage', '=', age]])

    return base
}