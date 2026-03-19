const axios = require('axios');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    
    // Backend API URL - replace with your actual backend URL
    const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';
    
    if (pathname.startsWith('/api/id-validation/')) {
      // Proxy ID validation requests to backend
      const response = await axios({
        method: req.method,
        url: `${BACKEND_URL}${req.url}`,
        data: req.body,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization
        }
      });
      
      res.status(response.status).json(response.data);
    } else if (pathname.startsWith('/api/analytics/')) {
      // Proxy analytics requests to backend
      const response = await axios({
        method: req.method,
        url: `${BACKEND_URL}${req.url}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization
        }
      });
      
      res.status(response.status).json(response.data);
    } else if (pathname.startsWith('/api/health')) {
      // Proxy health requests to backend
      const response = await axios({
        method: req.method,
        url: `${BACKEND_URL}${req.url}`,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      res.status(response.status).json(response.data);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
