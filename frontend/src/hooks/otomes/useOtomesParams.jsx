import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

export default function useOtomesParams(id) {

    const [searchParams] = useSearchParams()

    return useMemo(() => {

        let filters = ['and', ["tag", "=", "g542"]]

        const page = Number(searchParams.get('page') ?? 1)
        const name = searchParams.get('name') ?? ''
        const sort = searchParams.get('sort') ?? 'votecount reverse'
        const platforms = searchParams.getAll('platform') ?? []
        const languages = searchParams.getAll('lang') ?? []
        const original_languages = searchParams.getAll('original_lang') ?? []
        const voice = searchParams.getAll('voice') ?? []
        const age = Number(searchParams.get('age') ?? 0)
        const tags = searchParams.getAll('tag') ?? []

        if (id) {
            if (id.startsWith('p')) filters.push(['developer', '=', ['id', '=', id]])
            if (id.startsWith('g')) filters.push(['tag', '=', id])
        }

        if (name.trim()) filters.push(["search", "=", name])
        if (platforms.length > 0) filters.push(['or', ...platforms.map(p => ['platform', '=', p])])
        if (voice.length > 0) filters.push(['release', '=', ['or', ...voice.map(v => ['voiced', '=', v])]])
        if (languages.length > 0) languages.forEach(l => filters.push(['lang', '=', l]))
        if (original_languages.length > 0) original_languages.forEach(l => filters.push(['olang', '=', l]))
        if (age) filters.push(['release', '=', ['minage', '=', age]])
        if (tags.length > 0) tags.forEach(tag => filters.push(['tag', '=', tag]))

        return {
            "filters": filters,
            "fields": "title, image.url",
            "results": 100,
            "page": page,
            "count": true,
            "sort": sort.replace("reverse", "").trim(),
            "reverse": sort.includes('reverse')
        }

    }, [searchParams, id])
}