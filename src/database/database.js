require('reflect-metadata')
const { DataSource } = require('typeorm');
const appConfig = require('../configs/app');
const dbConfig = require('../configs/database');

const {
    type,
    host,
    port,
    username,
    password,
    database,
} = dbConfig();
console.log(type);
console.log(host);
console.log(__dirname);
const appConfigData = appConfig();

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [__dirname + '/../app/Entities/*.js'],
    migrations: [__dirname + '/migrations/*.js'],
    logging: (appConfigData.environment === 'development')
        ? ['query', 'error']
        : []
})

module.exports = AppDataSource;