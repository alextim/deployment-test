import http from 'node:http';

const prefix = '';
const port = 3001;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
  const urlPath = req.url;
  console.log(urlPath);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  if (urlPath === `${prefix}/health`) {
    res.end(
      JSON.stringify({
        uptime: process.uptime(),
        timestamp: Date.now(),
      }),
    );
  } else {
    res.end(
      JSON.stringify({
        url: urlPath,
      }),
    );
  }
});

server.listen(port, host, () => {
  console.log(`Listening for   request on ${host}:${port}`);
});
