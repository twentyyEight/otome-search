export default function charactersFormarter(characters, otome_id, vas) {

    const roles = [
        { key: 'main', label: 'Protagonist' },
        { key: 'primary', label: 'Main Character' },
        { key: 'side', label: 'Side Character' },
        { key: 'appears', label: 'Makes an appearance' }
    ]

    /* Reorden de propiedades */
    const new_characters = characters.map(({ vns, traits, ...character }) => {

        const role_key = vns.find(vn => vn.id === otome_id)?.role

        return {
            ...character,
            role: roles.find(role => role.key === role_key)?.label,
            voice: vas.find(va => va.character.id === character.id)?.staff ?? null,
            traits: traits.reduce((obj, trait) => {
                if (!obj[trait.group_name]) obj[trait.group_name] = []
                obj[trait.group_name].push(trait)
                return obj
            }, {})
        }
    }).sort((a, b) =>
        roles.findIndex(role => role.label === a.role) - roles.findIndex(role => role.label === b.role)
    )

    return new_characters
}