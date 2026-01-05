//https://www.npmjs.com/package/jsonwebtoken
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your-256-bit-secret';

// Function to generate a JWT
function generateToken(payload, expiresIn = process.env.TOKEN_EXPIRES_IN || '1h') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Function to verify a JWT
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        console.log('Token verification failed:', err.message);

        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};