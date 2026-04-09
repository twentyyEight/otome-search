import StateList from "../../models/lists/state.model.js"

export const addOtomeState = async (req, res) => {

    const { id, state } = req.body
    const { id: user_id } = req.user

    try {

        const exists = await OtomeStateList.findOne({ user_id, 'otomes.id': id })

        if (exists) {
            await OtomeStateList.updateOne(
                { user_id, 'otomes.id': id },
                { $set: { 'otomes.$.state': Number(state) } }
            )
        } else {
            await OtomeStateList.updateOne(
                { user_id },
                { $push: { otomes: { id, state: Number(state) } } },
                { upsert: true, runValidators: true }
            )
        }

        return res.status(200).json({ message: "Otome added successfully" })

    } catch (error) {

        return res.status(error.status || 500).json({ message: error.message })
    }
}

export const getOtomeState = async (req, res) => {

    const { id } = req.params
    const { id: user_id } = req.user

    try {
        const result = await OtomeStateList.findOne({ user_id, 'otomes.id': id }, { 'otomes.$': 1 })

        if (!result || !result.otomes.length) return res.json("")

        const state = result?.otomes[0]?.state;

        return res.status(200).json(state)

    } catch (error) {

        return res.status(error.status || 500).json({ message: error.message })
    }
}

export const deleteOtomeState = async (req, res) => {

    const { id } = req.params
    const { id: user_id } = req.user

    try {
        await OtomeStateList.updateOne(
            { user_id },
            { $pull: { otomes: { id } } },
        )
        return res.status(200).json({ message: "Otome deleted successfully" })

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
}
