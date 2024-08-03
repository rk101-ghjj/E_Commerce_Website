import mongoose from "mongoose";
import colors from "colors";
const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log(`Error in connecting to the database: ${error}`.red.underline.bold)
    }
}

export default connectionDB


