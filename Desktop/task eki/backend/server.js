const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', (req, res) => {
    let file = fs.readFileSync('./data.json', 'utf-8');
    let users = JSON.parse(file || '[]');
    res.json(users);
});

app.post('/register', (req, res) => {
    let file = fs.readFileSync('./data.json', 'utf-8');
    let users = JSON.parse(file || '[]');

    let user = req.body;
    users.push(user);

    fs.writeFileSync('./data.json', JSON.stringify(users, null, 2));
    res.json({ message: 'done' });
});

app.post('/login', (req, res) => {
    let file = fs.readFileSync('./data.json', 'utf-8');
    let users = JSON.parse(file || '[]');

    let email = req.body.email;
    let pass = req.body.password;

    let match = users.find(u => u.email == email && u.password == pass);

    if (match) {
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('server working');
});