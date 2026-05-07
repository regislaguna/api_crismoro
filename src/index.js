require('dotenv').config();
const express = require('express');
const rotas = require('./routes');
const cors = require('cors'); // npm i cors
const AppDataSource = require('./database/database');
const appConfig = require('./configs/app');
const path = require('path'); // Módulo nativo do Node.js para lidar com caminhos de arquivos

const startDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conectado ao banco de dados com sucesso!'); // Pequena correção ortográfica aqui
    } catch (error) {
        console.log(error);
        return;
    }
}

startDatabase();

const server = express();

// Configurações básicas de segurança e leitura de dados
server.use(cors());
server.use(express.json());

// --- NOVA IMPLEMENTAÇÃO: Servindo arquivos estáticos (Imagens) ---
// Transforma a pasta 'uploads' em uma rota pública. 
// Tudo que o Multer salvar lá poderá ser visto pelo site.
server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); 

// Rotas da aplicação
server.use(rotas);

// Tratamento para rotas não mapeadas (Sempre deve ficar por último)
server.use((req, res) => {
    res.status(404).send('Rota não encontrada');
});

const { name, port } = appConfig();

// O Railway injeta automaticamente a variável process.env.PORT. 
// Se ela existir, usamos ela. Se não (localmente), usamos a do appConfig.
const PORT_TO_LISTEN = process.env.PORT || port || 3333;

server.listen(PORT_TO_LISTEN, '0.0.0.0', () => {
    console.log(`${name} rodando na porta ${PORT_TO_LISTEN}`);
});