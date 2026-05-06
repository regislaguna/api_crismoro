// --- DOCUMENTAÇÃO E IMPORTAÇÕES ---
require('dotenv').config();
const express = require('express');
const rotas = require('./routes');
const cors = require('cors'); // npm i cors
const AppDataSource = require('./database/database');
const appConfig = require('./configs/app');

// 1. Nova Importação: 'path' é nativo do Node.js e ajuda a encontrar pastas
const path = require('path'); 

// --- INICIALIZAÇÃO DA BASE DE DADOS ---
const startDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conectado ao banco de dados com sucesso');
    } catch (error) {
        console.log(error);
        return;
    }
}

startDatabase();

// --- CONFIGURAÇÃO DO SERVIDOR ---
const server = express();
server.use(cors());
server.use(express.json());

// ==========================================
// 2. NOVO CÓDIGO: PERMISSÃO DE ARQUIVOS ESTÁTICOS
// ==========================================
// Cria uma rota pública para a pasta de imagens.
// Se este teu ficheiro estiver dentro de uma pasta 'src', usamos '..' para voltar à raiz onde a pasta 'uploads' foi criada.
server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));


// --- ROTAS DA API ---
// É importante que as rotas fiquem abaixo do express.static
server.use(rotas);

// --- ROTA DE FALLBACK (ERRO 404) ---
server.use((req, res) => {
    res.send('rota não encontrada');
});

// --- INÍCIO DO SERVIDOR ---
const { name, port } = appConfig();
server.listen(port, () => {
    console.log(`${name} rodando na porta ${port}`);
});