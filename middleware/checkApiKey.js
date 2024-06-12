// checkApiKey.js
module.exports = function (req, res, next) {
    const apiKey = req.headers['api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'API key is missing' });
    }

    // Replace 'your-secret-api-key' with your actual API key
    if (apiKey !== process.env.APP_API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    // If the API key is valid, proceed to the next middleware or route handler
    next();
};
