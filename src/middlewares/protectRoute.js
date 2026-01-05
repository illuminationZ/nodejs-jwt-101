// Protected route middleware
const { verifyToken } = require('../helpers/jwtService');
module.exports = function protectRoute(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Extract token from "Bearer <token>"
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        if (decoded) {
            // Attach decoded user info to request object
            req.user = decoded;
            next(); // Proceed to the next middleware or route handler
        } else {
            res.status(403).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};