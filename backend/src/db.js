import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost/otome-search`);
        console.log(">>> BD conectada")
    }
    catch(error){
        console.log("Error en BD:", error)
    }
};