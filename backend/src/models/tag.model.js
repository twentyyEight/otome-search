import mongoose from "mongoose";

export const Tag = mongoose.model('Tag', new mongoose.Schema({}, { strict: false }))