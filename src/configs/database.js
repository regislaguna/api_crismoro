require('dotenv').config()

const dbConfig = () => ({
    type: process.env.DB_TYPE ?? 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST ?? 'localhost',
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'defaultcm'
})

module.exports = dbConfig