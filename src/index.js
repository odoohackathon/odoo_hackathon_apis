// Import the express module
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connect_to_db from './config/mongoDbConnection.config.js';
import cors from "cors";

import adminRoutes from "./routes/admin.routes.js"
import userRoutes from "./routes/user.routes.js"
import commonRoutes from "./routes/common.routes.js"
import crimeRoutes from "./routes/crime.routes.js"

// Create an instance of express
const app = express();

connect_to_db();

// Define the port
const PORT = process.env.PORT;

// Define a route for the root URL ("/")
app.use(cors());
app.use(express.json());


app.use("/api/v1/admin",adminRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/common",commonRoutes);
app.use("/api/v1/crime",crimeRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
