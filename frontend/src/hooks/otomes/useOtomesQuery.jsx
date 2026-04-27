import { useMemo } from "react"

export default function useOtomesQuery({ page, name, sort, platforms, languages, original_languages, voice, age, tags }) {

    return useMemo(() => {

        let filters = ['and', ["tag", "=", "g542"], ["devstatus", "!=", 2]]
        let release = ["release", "=", ["and"]]

        if (name.trim()) filters.push(["search", "=", name])
        if (tags.length > 0) tags.forEach(tag => filters.push(['tag', '=', tag]))
        if (original_languages.length > 0) original_languages.forEach(lang => filters.push(['olang', '=', lang]))

        if (platforms.length > 0) release[2].push(...platforms.map(platform => ['platform', '=', platform]))
        if (voice.length > 0) release[2].push(...voice.map(v => ['voiced', '=', v]))
        if (languages.length > 0) languages.forEach(lang => release[2].push(['lang', '=', lang]))
        if (age) release[2].push(['minage', '=', age])

        if (release[2].length > 1) filters.push(release)

        return {
            "filters": filters,
            "fields": "title, image.url",
            "results": 100,
            "page": page,
            "count": true,
            "sort": sort.replace("reverse", "").trim(),
            "reverse": sort.includes('reverse')
        }

    }, [page, name, sort, platforms, languages, original_languages, voice, age, tags])
}
