import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"

export default function useOtomesParams() {

    const [searchParams] = useSearchParams()

    return useMemo(() => ({
        page: Number(searchParams.get('page') ?? 1),
        name: searchParams.get('name') ?? '',
        sort: searchParams.get('sort') ?? 'votecount reverse',
        platforms: searchParams.getAll('platform') ?? [],
        languages: searchParams.getAll('lang') ?? [],
        original_languages: searchParams.getAll('original_lang') ?? [],
        voice: searchParams.getAll('voice') ?? [],
        age: Number(searchParams.get('age') ?? 0),
        tags: searchParams.getAll('tag') ?? [],
    }), [searchParams])
}
