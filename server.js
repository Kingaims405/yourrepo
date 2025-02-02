const express = require('express');
const axios = require('axios'); // Import axios
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

require('dotenv').config(); // Load environment variables
const API_KEY = process.env.API_KEY; // Access the API key
const API_URL = 'https://pidkey.com/ajax/cidms_api';

app.use(express.json());

app.post('/fetch-api-data', async (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { iid } = req.body;

    if (!iid) {
        return res.status(400).json({ error: 'IID is required' });
    }

    const url = `${API_URL}?iids=${encodeURIComponent(iid)}&justforcheck=0&apikey=${API_KEY}`;
    console.log('API URL:', url); // Log the API URL

    try {
        const response = await axios.get(url); // Use axios to make the request
        const result = response.data; // Axios stores the response data in .data
        res.json(result);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});