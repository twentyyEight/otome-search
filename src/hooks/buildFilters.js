export default function buildFilters(formValues) {

    const { name, platform, voice, lang, olang } = formValues

    const filters = ['and', ["tag", "=", "g542"]]
    const platforms = ['or']
    const voiced = ['release', '=', ['or']]

    if (name) filters.push(["search", "=", name]);

    if (platform) {
        platform.forEach(p => { platforms.push(['platform', '=', p]) });

        if (platforms.length > 1) {
            filters.push(platforms)
        } else {
            filters.filter(i => JSON.stringify(i) != JSON.stringify(platforms))
        }
    }

    if (voice) {
        voice.forEach(v => { voiced[2].push(['voiced', '=', v]) })

        if (voiced.length > 3) {
            filters.push(voiced)
        } else {
            filters.filter(i => JSON.stringify(i) != JSON.stringify(voice))
        }
    }

    if (lang) {
        lang.forEach(l => { filters.push(['lang', '=', l]) })
    }

    if (olang) {
        olang.forEach(l => { filters.push(['olang', '=', l]) })
    }

    return filters
}