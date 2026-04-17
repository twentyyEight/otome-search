import { Staff } from '../models/staff.model.js'

export const getStaffs = async (req, res) => {

    let { page } = req.query

    const skip = (page - 1) * 100

    try {

        const staffs = await Staff.find().sort({ name: 1 }).limit(100).select('-_id').skip(skip)
        const total = await Staff.countDocuments()

        return res.json({ staffs, total })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}