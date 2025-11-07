const dotenv = require('dotenv')

dotenv.config()

const appConfig = () => ({
    name: process.env.APP_NAME ?? 'API DEFAULT',
    port: process.env.APP_PORT || 3333,
    environment: process.env.NODE_ENV ?? 'development'
})

module.exports = appConfig