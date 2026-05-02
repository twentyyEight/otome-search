export default function charactersFormarter(characters, otome_id, vas) {

    const ROLES = [
        { key: 'main', label: 'Protagonist(s)' },
        { key: 'primary', label: 'Main Character(s)' },
        { key: 'side', label: 'Side Character(s)' },
        { key: 'appears', label: 'Makes an appearance' }
    ]

    /* Reorden de propiedades */
    const reorder = characters.map(({ traits, ...character }) => {

        return {
            ...character,
            voice: vas.find(va => va.character.id === character.id)?.staff.name ?? null,
            traits:
                traits
                    .filter(trait => trait.group_id === 'i39')
                    .map(({ id, name, lie, spoiler }) => ({ id, name, lie, spoiler }))
        }
    })

    /* Agrupa por roles */
    const grouped = ROLES.reduce((obj, role) => {

        const filtered = reorder.filter(c => {

            const character_role_key = c.vns.find(vn => vn.id === otome_id)?.role
            return character_role_key === role.key
        })

        if (filtered.length > 0) obj[role.label] = filtered

        return obj
    }, {})

    /* Elimina el campo 'vns' al ya no tener utilidad */
    Object.values(grouped).forEach(arr => {
        arr.forEach(character => delete character.vns)
    })

    return grouped
}