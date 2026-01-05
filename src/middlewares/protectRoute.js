// Protected route middleware
const { verifyToken } = require('../helpers/jwtService');
module.exports = function protectRoute(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        if (decoded) {
            req.user = decoded;
            next();
        } else {
            res.status(403).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};