<<<<<<< HEAD
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
=======
require('dotenv').config();
require('reflect-metadata');
const path = require('path');
const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE || 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'landpagecm',
  synchronize: false, // Use migrations para manter o schema
  logging: process.env.NODE_ENV === 'development' ? ['query', 'error'] : false,
  entities: [path.resolve(__dirname, '../app/Entities/**/*.js')],
  migrations: [path.resolve(__dirname, './migrations/**/*.js')],
});

module.exports = AppDataSource;
>>>>>>> 176a22d9a86985f120464dcb42d1ce07083b1364
