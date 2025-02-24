const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Load the users.json file


const user= require('./data/users.json');

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

function escribeFile(user) {
    fs.writeFileSync('./data/users.json', JSON.stringify(user), 'utf-8');

    
}
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/users', (req, res) => {
    res.json({
        message: 'List of users',
        data: user,
        // data: user.slice(0, 1), // Limit the response to the first user
    });
});

app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;
    user.push({
        id: user.length + 1,
        name,
        email,
        password,
    });
    res.json({
        message: 'User added',
        data: user,
    });
    escribeFile(user) 
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    user.forEach((element) => {
        if (element.id == id) {
            element.name = name;
            element.email = email;
            element.password = password;
        }
    });
    res.json({
        message: 'User updated',
        data: user,
    });
    escribeFile(user) 
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    user.forEach((element, index) => {
        if (element.id == id) {
            user.splice(index, 1);
        }
    });
    res.json({
        message: 'User deleted',
        data: user,
    });
    escribeFile(user) 
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});


