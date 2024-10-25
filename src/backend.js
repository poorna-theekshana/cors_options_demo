const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// CORS configuration for unrestricted access
const corsConfig = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Open CORS endpoint
app.get('/open-data', cors(corsConfig), (req, res) => {
  res.json({ message: 'This data is accessible from any origin.' });
});

// Restricted CORS endpoint
const restrictedCorsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.get('/restricted-data', cors(restrictedCorsOptions), (req, res) => {
  res.json({
    message: 'This data is accessible only from the allowed origin.',
  });
});

// Serve the index.html file on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
