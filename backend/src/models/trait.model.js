import mongoose from "mongoose";

export const Trait = mongoose.model('Trait', new mongoose.Schema({}, { strict: false }))