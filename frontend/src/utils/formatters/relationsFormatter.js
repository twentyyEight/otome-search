export default function relationsFormatter(otomes) {

    const RELATIONS = [
        { 'key': 'preq', 'name': 'Prequel' },
        { 'key': 'seq', 'name': 'Sequel' },
        { 'key': 'fan', 'name': 'Fandisk' },
        { 'key': 'side', 'name': 'Side Story' },
        { 'key': 'ser', 'name': 'Same Series' },
        { 'key': 'char', 'name': 'Shares Characters' },
    ]

    const grouped = RELATIONS.reduce((obj, rel) => {

        const filtered = otomes.filter(otome => otome.relation === rel.key)
        if (filtered.length > 0) obj[rel.name] = filtered
        return obj
    }, {})

    return grouped
}