import mongoose from "mongoose";

export const Staff = mongoose.model('Staff', new mongoose.Schema({}, { strict: false }))