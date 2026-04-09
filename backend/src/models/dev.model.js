import mongoose from "mongoose";

export const Developer = mongoose.model('Developer', new mongoose.Schema({}, { strict: false }))