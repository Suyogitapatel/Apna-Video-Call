import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.post('/register', (req, res) => {
    console.log('Endpoint hit');
    console.log(req.body)
});

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://suyogitapatel77:apnavideocall@cluster0.4dfgy.mongodb.net/test?retryWrites=true&w=majority")

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
 
    mongoose.connection.on("connected", () => {
        console.log("✅ Mongoose connected to DB:", mongoose.connection.name);
    });
    server.listen(app.get("port"), () => {
        console.log("LISTENIN ON PORT 8000")
    });



}



start();


