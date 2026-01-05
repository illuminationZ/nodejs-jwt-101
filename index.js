const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { hashPassword, comparePassword } = require('./src/helpers/passHash');
const { generateToken, verifyToken } = require('./src/helpers/jwtService');
const protectRoute = require('./src/middlewares/protectRoute');

// Load environment variables from .env file
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Sample DB
const users = [];

// Registration route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });

});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && await comparePassword(password, user.password)) {
        const token = generateToken({ username });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Protected route
app.get('/users', protectRoute, (req, res) => {
    res.json(users.map(u => ({ username: u.username })));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});