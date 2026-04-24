import { useSearchParams, useParams } from "react-router-dom"
import { useMemo } from "react"

export default function useOtomesParams() {

    const { id } = useParams()
    const [searchParams] = useSearchParams()

    return useMemo(() => {

        // Params
        const page = Number(searchParams.get('page') ?? 1)
        const name = searchParams.get('name') ?? ''
        const sort = searchParams.get('sort') ?? 'votecount reverse'
        const platforms = searchParams.getAll('platform') ?? []
        const languages = searchParams.getAll('lang') ?? []
        const original_languages = searchParams.getAll('original_lang') ?? []
        const voice = searchParams.getAll('voice') ?? []
        const age = Number(searchParams.get('age') ?? 0)
        const tags = searchParams.getAll('tag') ?? []

        // Filters
        let filters = ['and', ["tag", "=", "g542"]]
        let release = ["release", "=", ["and"]]

        if (id) {
            if (id.startsWith('p')) filters.push(['developer', '=', ['id', '=', id]])
            if (id.startsWith('g')) filters.push(['tag', '=', id])
        }

        if (name.trim()) filters.push(["search", "=", name])
        if (tags.length > 0) tags.forEach(tag => filters.push(['tag', '=', tag]))
        if (original_languages.length > 0) original_languages.forEach(lang => filters.push(['olang', '=', lang]))

        if (platforms.length > 0) release[2].push(...platforms.map(platform => ['platform', '=', platform]))
        if (voice.length > 0) release[2].push(...voice.map(v => ['voiced', '=', v]))
        if (languages.length > 0) languages.forEach(lang => release[2].push(['lang', '=', lang]))
        if (age) release[2].push('minage', '=', age)

        if (release[2].length > 1) filters.push(release)

        return {
            params: { page, name, sort, platforms, languages, original_languages, voice, age, tags },
            query: {
                "filters": filters,
                "fields": "title, image.url",
                "results": 100,
                "page": page,
                "count": true,
                "sort": sort.replace("reverse", "").trim(),
                "reverse": sort.includes('reverse')
            }
        }

    }, [searchParams, id])
}