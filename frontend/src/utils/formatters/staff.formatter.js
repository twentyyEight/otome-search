import apiFetchSchema from "../fetching/apiFetchSchema"

async function staffRolesCategories() {

    const res = await apiFetchSchema().catch(() => null)
    const staffs_roles = res?.enums?.staff_role ?? []

    return staffs_roles
}

export default async function staffFormatter(staff, otomes) {

    let main = staff.find(result => result.ismain)
    const extlinks = staff.find(result => result.extlinks?.length > 0)?.extlinks
    main.extlinks = extlinks ?? []

    const id = main.id

    const roles = { 'voice': [], 'others': [] }

    const roles_categories = await staffRolesCategories()

    otomes.forEach(otome => {

        const others_match = otome.staff?.find(s => s.id === id)
        const voice_match = otome.va?.find(v => v.staff.id === id)

        const otome_data = {
            id: otome.id,
            title: otome.title,
            image: otome.image?.url,
            released: otome.released
        }

        if (others_match) {

            const type = roles_categories.find(cat => cat.id === others_match.role)?.label

            roles['others'].push({
                role: {
                    type: type ?? others_match.role,
                    note: others_match.note
                },
                otome: otome_data
            })
        }

        if (voice_match) {
            roles['voice'].push({
                character: {
                    id: voice_match.character.id,
                    name: voice_match.character.name,
                    image: voice_match.character.image?.url
                },
                otome: otome_data
            })
        }
    })

    main.roles = roles

    return main
}