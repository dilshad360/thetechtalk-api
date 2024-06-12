import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import News from './models/news.js';
import './fetchNews.js';


const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});


app.get('/api/getnews', async (req, res) => {

    try {
        const data = await News.find();
        if(data.length===0 ){
            return res.status(404).json({message:"No news found"})
        }
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.get('/api/test', async (req, res) => {
    res.status(201).json("working");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



