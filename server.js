const express = require('express');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
const app = express();
const port = 3000;
dotenv.config();

const API_KEY = process.env.API_KEY;

app.use(express.static('public'));

app.get('/api/shop', (req, res) => {
  const options = {
    hostname: 'fnbr.co',
    path: '/api/shop',
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
    },
  };

  const request = https.request(options, response => {
    let data = '';

    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        const filePath = './public/shopData.json';

        fs.writeFile(filePath, JSON.stringify(parsedData), err => {
          if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error writing to file');
          } else {
            console.log('Data saved to', filePath);
            res.json(parsedData);
          }
        });
      } catch (error) {
        console.error('Error parsing data:', error);
        res.status(500).send('Error parsing data');
      }
    });
  });

  request.on('error', error => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  });

  request.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
