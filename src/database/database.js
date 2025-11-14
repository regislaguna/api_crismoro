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
