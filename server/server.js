// call in express
const express = require('express');
// create app for function that will use a port
const app = express();
// create port
const PORT = 5001;

// where the public/static files are:
app.use(express.static('server/public'));












app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});