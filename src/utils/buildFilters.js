export default function buildFilters(formValues) {

    const { name, platform, voice, lang, olang } = formValues

    const filters = ['and', ["tag", "=", "g542"]]

    if (name) filters.push(["search", "=", name]);

    if (platform.length > 0) {
        const platforms = ['or', ...platform.map(p => ['platform', '=', p])];
        filters.push(platforms);
    }

    if (voice.length > 0) {
        const voiced = ['release', '=', ['or', ...voice.map(v => ['voiced', '=', v])]];
        filters.push(voiced);
    }

    if (lang) lang.forEach(l => { filters.push(['lang', '=', l]) })


    if (olang) olang.forEach(l => { filters.push(['olang', '=', l]) })


    return filters
}