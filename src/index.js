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

// O Railway injeta automaticamente a variável process.env.PORT. 
// Se ela existir, usamos ela. Se não (localmente), usamos a do appConfig.
const PORT_TO_LISTEN = process.env.PORT || port || 3333;

server.listen(PORT_TO_LISTEN, '0.0.0.0', () => {
    console.log(`${name} rodando na porta ${PORT_TO_LISTEN}`);
});