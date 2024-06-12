// models/News.js
import { Schema, model } from 'mongoose';

const newsSchema = new Schema({
    title: String,   
    description: String,
    link: String,
    pubDate: String,
    image_url: String,
    source_id: String,
    source_url: String,
    source_icon: String,
});

export default model('News', newsSchema);
