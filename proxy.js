const http = require('http');
const https = require('https');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  const targetUrl = url.parse(req.url, true);

  const options = {
    hostname: 'api.genius.com',
    port: 443,
    path: targetUrl.pathname + '?' + new URLSearchParams(targetUrl.query),
    method: req.method,
    headers: {
      'Authorization': 'Bearer kDXvgm10GXDOLLXq2XXZZiU0DV3cdDCjtI957ykKOjy6McI32opc-8ytGmw5-_Pu',
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/json'
    }
  };

  const proxyReq = https.request(options, (proxyRes) => {
    res.statusCode = proxyRes.statusCode;
    res.headers = proxyRes.headers;

    proxyRes.on('data', (chunk) => {
      res.write(chunk);
    });

    proxyRes.on('end', () => {
      res.end();
    });
  });

  req.on('data', (chunk) => {
    proxyReq.write(chunk);
  });

  req.on('end', () => {
    proxyReq.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Proxy server running at http://${hostname}:${port}/`);
});
