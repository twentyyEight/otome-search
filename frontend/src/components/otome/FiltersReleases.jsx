import { useState } from "react"

export default function FiltersReleases({ schema, original, setReleases }) {

    {/* CHECKBOXES CONTENT */ }
    let platforms_otome = new Set()
    let languages_otome = new Set()

    original.forEach(release => {
        release.platforms.forEach(p => platforms_otome.add(p))
        release.languages.forEach(l => languages_otome.add(l.lang))
    })

    const platforms = schema.enums.platform.filter(plat => Array.from(platforms_otome).includes(plat.id))
    const languages = schema.enums.language.filter(lang => Array.from(languages_otome).includes(lang.id))


    {/* RELEASES FILTERS */ }
    const [selectedPlatforms, setSelectedPlatforms] = useState([])
    const [selectedLanguages, setSelectedLanguages] = useState([])

    const filterReleases = (platforms, languages) => {
        const res = original.filter(release => {
            const matchPlatform = platforms.length === 0 || platforms.some(p => release.platforms.includes(p))
            const matchLanguage = languages.length === 0 || languages.some(l => release.languages.map(rl => rl.lang).includes(l))
            return matchPlatform && matchLanguage
        })
        setReleases(res)
    }

    const handleFilter = (type, value) => {
        if (type === 'platform') {
            const updated = selectedPlatforms.includes(value)
                ? selectedPlatforms.filter(p => p !== value)
                : [...selectedPlatforms, value]
            setSelectedPlatforms(updated)
            filterReleases(updated, selectedLanguages)
        }

        if (type === 'language') {
            const updated = selectedLanguages.includes(value)
                ? selectedLanguages.filter(l => l !== value)
                : [...selectedLanguages, value]
            setSelectedLanguages(updated)
            filterReleases(selectedPlatforms, updated)
        }
    }

    return (
        <div>
            <p>Platforms</p>
            {platforms.map(platform =>

                <div key={platform.id}>
                    <input
                        type="checkbox"
                        id={platform.id}
                        value={platform.id}
                        onChange={(e) => handleFilter('platform', e.target.value)} />
                    <label htmlFor={platform.id}>{platform.label}</label>
                </div>
            )}

            <p>Languages</p>
            {languages.map(language =>
                <div key={language.id}>
                    <input
                        type="checkbox"
                        id={language.id}
                        value={language.id}
                        onChange={(e) => handleFilter('language', e.target.value)} />
                    <label htmlFor={language.id}>{language.label}</label>
                </div>
            )}
        </div>
    )
}