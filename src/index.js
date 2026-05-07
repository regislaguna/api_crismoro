/*
 * Arquivo: src/index.js
 * Descrição: Ponto de entrada da API. Configura conexão com banco,
 * segurança (CORS), rotas e arquivos públicos.
 */

require('dotenv').config();
const express = require('express');
const rotas = require('./routes');
const cors = require('cors'); 
const AppDataSource = require('./database/database');
const appConfig = require('./configs/app');
const path = require('path');

// 1. Inicialização do Banco de Dados
const startDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conectado ao banco de dados com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
        return;
    }
}

startDatabase();

const server = express();

// 2. Configurações Globais (Middlewares de Base)
server.use(cors());
server.use(express.json());

// No seu src/index.js do Backend
const path = require('path');

// Esta linha é a "chave" para o Railway encontrar a pasta uploads
server.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 4. Rotas da Aplicação
// As rotas dentro deste arquivo podem conter o middleware de autenticação.
server.use(rotas);

// 5. Tratamento de Erros (Rota 404)
server.use((req, res) => {
    res.status(404).send('Rota não encontrada');
});

// 6. Configuração da Porta e Inicialização
const { name, port } = appConfig();
const PORT_TO_LISTEN = process.env.PORT || port || 3333;

server.listen(PORT_TO_LISTEN, '0.0.0.0', () => {
    console.log(`${name} rodando na porta ${PORT_TO_LISTEN}`);
});