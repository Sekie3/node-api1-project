const server = require('./api/server');

const port = 9000;

// Start your server here
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
