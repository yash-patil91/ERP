// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (token) {
        try {
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY);
            req.user = decoded.user;
        } catch (err) {
            res.status(401).json({ message: 'Token is not valid' })
        }
    }
    next();     
};
