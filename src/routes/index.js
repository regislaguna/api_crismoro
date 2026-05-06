/*
* Ficheiro: src/routes/index.js
* (CORRIGIDO para usar 'require' - CommonJS)
*/

const { Router } = require('express');
const multer = require('multer');

// 1. Importe todos os seus controladores
const ServicoController = require('../controller/ServicoController');
const AgendamentoController = require('../controller/AgendamentoController');
const QuestionarioController = require('../controller/QuestionarioController');
const UploadController = require('../controller/UploadController');
const UsuarioController = require('../controller/UsuarioController');
const RelatorioController = require('../controller/RelatorioController'); // ✅ NOVO

// 2. Importe o middleware de autenticação
const authMiddleware = require('../middleware/authMiddleware');

// 3. Configuração do Multer (armazenamento em memória)
const multerConfig = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
};
const upload = multer(multerConfig);

// 4. Inicializa o roteador
const routes = Router();


// --- Rotas Públicas (acesso sem login) ---

routes.post('/register', UsuarioController.register);
routes.post('/login', UsuarioController.login);

// Listagem de serviços para o site
routes.get('/servicos', ServicoController.index);

// Formulários públicos
routes.post('/agendamentos', AgendamentoController.store);
routes.post('/questionario', QuestionarioController.store);


// --- Rotas Privadas (acesso com autenticação) ---

routes.use(authMiddleware); // Protege todas as rotas abaixo

// CRUD de serviços (Painel Admin)
routes.post('/servicos', ServicoController.store);
routes.put('/servicos/:id', ServicoController.update);
routes.delete('/servicos/:id', ServicoController.delete);

// Upload de imagens para GCS
routes.post('/upload', upload.single('file'), UploadController.store);

// Painel Admin: visualizar dados
routes.get('/agendamentos-admin', AgendamentoController.index);
routes.get('/questionarios-admin', QuestionarioController.index);
routes.get('/usuarios', UsuarioController.listar);
routes.get('/perfil', UsuarioController.perfil);

// ✅ Nova rota: gerar relatório em PDF das respostas
routes.get('/relatorio-questionarios', RelatorioController.gerarPDF);

// DEPOIS: ESTA É A NOVA ROTA ADICIONADA
routes.get('/relatorio-agendamentos', RelatorioController.gerarPDFAgendamentos); // Assumindo que o método se chama 'gerarPDFAgendamentos'

// ✅ Novas rotas: exclusão de duplicados
routes.delete('/agendamentos-duplicados', AgendamentoController.excluirDuplicados);
routes.delete('/questionarios-duplicados', QuestionarioController.excluirDuplicados);


// 5. Exporta as rotas
module.exports = routes;
