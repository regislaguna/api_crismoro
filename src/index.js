/*
* Ficheiro: src/index.js
* (O ficheiro principal que inicia a sua API)
*/

// 1. Carrega o .env ANTES de tudo
require('dotenv').config();

// 2. Importa o Express e o Cors
const express = require('express');
const cors = require('cors');

// 3. Importa a ligação da Base de Dados (sem inicializar ainda)
const AppDataSource = require('./database/database');

// 4. Importa as suas Rotas (o ficheiro routes/index.js)
const routes = require('./routes');

// 5. Cria a aplicação Express
const app = express();

// 6. Configura os Middlewares
app.use(cors()); // Permite que o seu Frontend (React) aceda a esta API
app.use(express.json()); // Permite à API ler JSON (essencial para req.body)

// 7. Usa o seu ficheiro de rotas
app.use(routes);

// 8. Define a porta (lê a porta 3333 do seu .env)
const port = process.env.APP_PORT || 3001;

// 9. Inicializa o banco de dados e só então inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Data Source inicializado com sucesso!');
    app.listen(port, () => {
      console.log(`🚀 API LandPage rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Falha ao inicializar o Data Source:', err);
  });
