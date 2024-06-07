const crypto = require('crypto');

exports.generateSecretKey = () => {
    return crypto.randomBytes(32).toString('base64');
};