const express = require('express');
const app = express();

const PORT = 3000;
const HOST = '0.0.0.0';

// Route for /
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Hello DevOps App</title>
            </head>
            <body style="text-align:center;margin-top:50px;font-family:Arial;">
                <h1>Hello DevOps!</h1>
                <p>Welcome to my internship project app.</p>
            </body>
        </html>
    `);
});

app.listen(PORT, HOST, () => {
    console.log(`App running at http://${HOST}:${PORT}`);
});

