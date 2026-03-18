import { useMemo } from "react";

export default function useParamsFilters(searchParams) {

    return useMemo(() => ({

        page: Number(searchParams.get('page') ?? 1),
        name: searchParams.get('name') ?? '',
        platforms: searchParams.getAll('platform') ?? [],
        languages: searchParams.getAll('language') ?? [],
        original_languages: searchParams.getAll('original_language') ?? [],
        voice: searchParams.getAll('voice') ?? [],
        age: Number(searchParams.get('age') ?? 0),
        sort: searchParams.get('sort') ?? 'votecount reverse'

    }), [searchParams])
}