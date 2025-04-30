const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const cutoffDate = new Date('2025-06-20T00:00:00Z');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Running Server`);
});

app.post('/submit', (req, res) => {
    const now = new Date();
    if (now > cutoffDate) {
        return res.status(401).json({message:"Submissions are closed"});
    }

    let {
  fullName,
  phoneNumber,
  address
}= req.body;

    if(!fullName || !phoneNumber || !address){
        return res.status(400).json({message:"All fields are required"});
    } 
    

const whatsappNumber = '917416161603';
const message = encodeURIComponent(`Hello, here are my details.\nName:${fullName}\nPhone Number:${phoneNumber}\nAddress:${address}`);
const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    res.status(200).json({redirectUrl: whatsappLink });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
