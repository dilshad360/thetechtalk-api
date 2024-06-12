require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const News = require("./models/news.js");
const fetchAndStoreNews = require("./fetchNews.js");
const checkApiKey = require("./middleware/checkApiKey.js");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log(process.env.MONGO_URI);

app.use(checkApiKey);

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

app.get("/", async (req, res) => {
    res.status(201).json("api server working");
});

app.get("/api/getnews", async (req, res) => {
    try {
        const data = await News.find();
        if (data.length === 0) {
            return res.status(404).json({ message: "No news found" });
        }
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get("/api/updatenews", async (req, res) => {
    try {
        await fetchAndStoreNews();
        res.status(201).json("News Updated");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
