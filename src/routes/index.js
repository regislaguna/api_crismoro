/*
* Ficheiro: src/routes/index.js
* (CORRIGIDO para usar 'require' - CommonJS)
*/

const { Router } = require('express');

// 1. Importe todos os seus controladores (usando 'require')
const ServicoController = require('../controller/ServicoController');
const AgendamentoController = require('../controller/AgendamentoController');
const QuestionarioController = require('../controller/QuestionarioController');
// Verifique o nome/caminho correto do seu controlador de login
const UsuarioController = require('../controller/UsuarioController'); 

// 2. Importe o seu middleware
const authMiddleware = require('../middleware/authMiddleware');

const routes = Router();

// --- Rotas Públicas (para clientes) ---

routes.post('/register', UsuarioController.register);

// Login (Usuário)
routes.post('/login', UsuarioController.login); // Assegure-se que UsuarioController.store é o seu método de login

// Listar Serviços (Página de Serviços)
routes.get('/servicos', ServicoController.index);

// Salvar Agendamento (Formulário de Agendamento)
routes.post('/agendamentos', AgendamentoController.store);

// Salvar Questionário (Formulário do Questionário)
routes.post('/questionario', QuestionarioController.store);


// --- Rotas Privadas (para o Painel do Admin) ---

// Aplicamos o middleware de autenticação
routes.use(authMiddleware); 

// CRUD de Serviços (para o seu Painel.jsx)
routes.post('/servicos', ServicoController.store);    // Criar
routes.put('/servicos/:id', ServicoController.update);    // Atualizar
routes.delete('/servicos/:id', ServicoController.delete); // Excluir

// (Opcional) Rota para o Admin ver os agendamentos no painel
routes.get('/agendamentos-admin', AgendamentoController.index);


// Rota para listar usuários (para o painel)
routes.get('/usuarios', UsuarioController.listar);
// Rota para ver o perfil logado
routes.get('/perfil', UsuarioController.perfil);
// (Opcional) Rota para o Admin ver as respostas dos questionários
// routes.get('/questionarios-admin', QuestionarioController.index); 

// 3. Exporte usando 'module.exports'
module.exports = routes;