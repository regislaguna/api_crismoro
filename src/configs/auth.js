const dotenv = require('dotenv');
dotenv.config();

const authConfig = () => ({
    jwt: {
        secret: process.env.JWT_SECRET || 'S3CR3TK3Y'
    }
});

module.exports = authConfig;