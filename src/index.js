require('dotenv').config()
const express = require('express');
const rotas = require('./routes');
const cors = require('cors'); // npm i cors
const AppDataSource = require('./database/database');
const appConfig = require('./configs/app');

const startDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conectado ao banco de ados com sucesso')
    } catch (error) {
        console.log(error)
        return;
    }
}

startDatabase();

const server = express();
server.use(cors())
server.use(express.json())

server.use(rotas);
server.use((req, res) => {
    res.send('rota não encontrada')
});
const { name, port } = appConfig();
server.listen(port, () => {
    console.log(`${name} rodando na porta ${port}`)
});