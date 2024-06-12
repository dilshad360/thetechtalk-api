
const axios = require('axios');
// const News = require('./models/news');
const cron = require('node-cron');
const { newsArrayTemp }  = require('./const.js');


const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchAndStoreNews() {


    try {
        
        // const response = await axios.get(`https://newsdata.io/api/1/news?language=en&country=in&category=technology&apikey=${NEWS_API_KEY}`);
        
        // const newsArray = response.data.results
        const newsArray = newsArrayTemp;
        
        dropNewsCollection();

        await News.insertMany(newsArray);


        console.log('News fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

async function dropNewsCollection() {
    
    try {
        await News.collection.drop();
        console.log('News collection dropped.');
    } catch (error) {
        if (error.code === 26) {
            console.log('News collection does not exist.');
        } else {
            throw error;
        }
    }
}



// Schedule the task to run every 6 hours
cron.schedule('0 */6 * * *', fetchAndStoreNews);

// Fetch news immediately when the app starts
fetchAndStoreNews();

module.exports = fetchAndStoreNews;
