const http = require('http');
const parseJSON = (req, callback) => {
  let body = '';
  
  // Accumulate data from the request stream
  req.on('data', chunk => {
    body += chunk;
  });

  // Once data is fully received
  req.on('end', () => {
    try {
      const parsedData = JSON.parse(body); 
      callback(null, parsedData);          
    } catch (error) {
      callback(error, null);               
    }
  });
};


const server = http.createServer((req, res) => {
  const { method, url } = req;
  res.setHeader('Content-Type', 'application/json');

  // Route for GET request to '/'
  if (method === 'GET' && url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Welcome to the home route!' }));
  }

  // Route for GET request to '/about'
  else if (method === 'GET' && url === '/about') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'This is the about page!' }));
  }

  // Route for POST request to '/data'
  else if (method === 'POST' && url === '/data') {
    // Parse JSON from request body
    parseJSON(req, (err, data) => {
      if (err) {
        res.writeHead(400); // Bad Request
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Data received', data }));
      }
    });
  }

  // Route for GET request to '/user'
  else if (method === 'GET' && url === '/user') {
    const user = {
      name: 'John Doe',
      age: 30,
      occupation: 'Software Developer',
    };
    res.writeHead(200);
    res.end(JSON.stringify({ user }));
  }

  // 404 response for unknown routes
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
