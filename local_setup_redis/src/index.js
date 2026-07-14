import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/redis", async (req,res) => {
    const reply = await redis.ping();
    res.send(reply);
})

app.get("/mongo", async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/chai_aur_redis");
        res.send("MongoDB connected successfully");
    } catch (error) {
        res.status(500).send("MongoDB connection failed: " + error.message);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});