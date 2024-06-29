import mongoose from "mongoose";

const connect_to_db = async() => {
    try {
        const URL = process.env.DB_URL;
        await mongoose.connect(URL);
        console.log("Database connected");
    } catch (error) {
        console.log("Unable to Connect Database",error);
        process.exit(1);   
    }
};

export default connect_to_db;