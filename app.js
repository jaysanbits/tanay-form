const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Hardcoded cutoff date (e.g., May 1, 2025)
const cutoffDate = new Date('2025-05-01T00:00:00Z');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const now = new Date();
    if (now > cutoffDate) {
        return res.send('<h2>Form submissions are now closed.</h2>');
    }

    // Simple HTML form
    res.send(`
        <form action="/submit" method="POST">
            <input type="text" name="name" placeholder="Enter your name" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/submit', (req, res) => {
    const now = new Date();
    if (now > cutoffDate) {
        return res.send('<h2>Submissions are closed. You cannot submit the form anymore.</h2>');
    }

    const whatsappNumber = '1234567890'; // Change this to your WhatsApp number
    const redirectUrl = `https://wa.me/${whatsappNumber}`;
    res.redirect(redirectUrl);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
