const dotenv = require('dotenv')

dotenv.config()

const authConfig = () => ({
    jwt: {
        secret: process.env.JWT_SECRET ?? 'default_secret'
    }
})

module.exports = authConfig