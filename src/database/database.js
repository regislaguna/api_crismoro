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
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    entities: [__dirname + '/../app/Entities/*.js'],
    migrations: [__dirname + '/migrations/*.js'],
    logging: (appConfigData.environment === 'development')
        ? ['query', 'error']
        : []
})

module.exports = AppDataSource;