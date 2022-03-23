const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: Bearer <token>
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { id: decodedToken.id, email: decodedToken.email, type: decodedToken.type , name: decodedToken.name};
        next();
    } catch (error) {
        return next(
            new HttpError(
                'Authentication failed',
                401
            )
        );
    }
};