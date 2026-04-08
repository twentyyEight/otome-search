function clasification(arr, key) {

    const arr_reduced = arr.reduce((obj, item) => {
        const { [key]: _, ...rest } = item  // extrae y descarta el campo key
        if (!obj[item[key]]) obj[item[key]] = []
        obj[item[key]].push(rest)
        return obj
    }, {})

    return arr_reduced
}


export default function charactersFormarter(characters, otome_id, vas) {

    /* Reorden de propiedades */
    // const characters = fetched_characters.map(({ character: { traits, vns, ...data }, staff }) => {

    //     return {
    //         ...data,
    //         role: vns.find(vn => vn.id === otome_id).role,
    //         voice_actor: staff,
    //         traits: clasification(traits, 'group_name')
    //     }
    // })
    const new_characters = characters.map(({ vns, traits, ...character }) => {
        return {
            ...character,
            role: vns.find(vn => vn.id === otome_id).role,
            voice: vas.find(va => va.character.id === character.id)?.staff ?? null,
            traits: clasification(traits, 'group_name')
        }
    })

    /* Clasifica cada character por su role */
    const grouped_by_role = clasification(new_characters, 'role')

    return grouped_by_role
}