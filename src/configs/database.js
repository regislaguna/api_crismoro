require('dotenv').config()

const dbConfig = () => ({
    type: process.env.DB_TYPE ?? 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST ?? 'localhost',
    username: process.env.DB_USERNAME ?? 'root', // Mudei de '' para 'root'
    password: process.env.DB_PASSWORD ?? '', 
    database: process.env.DB_DATABASE ?? 'landpagecm', // Mudei de 'defaultcm' para 'landpagecm'
    
    // Adicione estas linhas para o TypeORM encontrar suas tabelas locais
    entities: ["./src/app/Entities/*.js"],
    migrations: ["./src/database/migrations/*.js"],
    logging: true // Isso vai mostrar o SQL no seu terminal
})

module.exports = dbConfig