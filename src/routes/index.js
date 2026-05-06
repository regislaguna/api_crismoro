/*
* Ficheiro: src/routes/index.js
* Documentação: Rotas da aplicação com intercetador avançado de erros do Multer.
*/

const { Router } = require('express');

// 1. Importação dos Controladores
const ServicoController = require('../controller/ServicoController');
const AgendamentoController = require('../controller/AgendamentoController');
const QuestionarioController = require('../controller/QuestionarioController');
const UsuarioController = require('../controller/UsuarioController'); 
const RelatorioController = require('../controller/RelatorioController');
const ProntuarioController = require('../controller/ProntuarioController');

const multer = require('multer');
const multerConfig = require('../configs/multer');
const upload = multer(multerConfig);

// 2. Importação do Middleware de Autenticação
const authMiddleware = require('../middleware/authMiddleware');

const routes = Router();

// ==========================================
// --- ROTAS PÚBLICAS (Para Clientes) ---
// ==========================================
routes.post('/register', UsuarioController.register);
routes.post('/login', UsuarioController.login);
routes.get('/servicos', ServicoController.index);
routes.post('/agendamentos', AgendamentoController.store);
routes.post('/questionario', QuestionarioController.store);


// ==========================================
// --- ROTAS PRIVADAS (Para o Painel Admin) ---
// ==========================================
routes.use(authMiddleware); // <-- Segurança ativada

routes.get('/relatorio-agendamentos', RelatorioController.gerarAgendamentos);
routes.get('/relatorio-questionarios', RelatorioController.gerarQuestionarios);

// --------------------------------------------------------
// 🕵️ ESPIONAGEM DE UPLOAD: Rota de Criação de Serviço
// --------------------------------------------------------
routes.post('/servicos', (req, res, next) => {
  // Chamamos o Multer manualmente para podermos capturar o erro
  const processarUpload = upload.single('image');
  
  processarUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Se o Multer falhar, imprimimos a confissão exata no terminal
      console.log("❌ [MULTER ERROR]:", err.message);
      console.log("👉 O CAMPO QUE CAUSOU O PROBLEMA FOI:", err.field);
      
      // Enviamos a resposta para o navegador (Aba Network) para tu veres logo o problema
      return res.status(400).json({ 
        erro: "Erro de etiqueta de ficheiro.", 
        mensagem_multer: err.message,
        campo_rejeitado: err.field 
      });
    } else if (err) {
      // Erro desconhecido não relacionado ao Multer
      console.log("❌ [ERRO GERAL]:", err);
      return res.status(500).json({ erro: "Erro interno no upload." });
    }
    
    // Se não houve erros e as etiquetas combinam, passamos a bola ao Controlador!
    next();
  });
}, ServicoController.store);

// CRUD de Serviços (Restantes)
routes.put('/servicos/:id', upload.single('image'), ServicoController.update);  
routes.delete('/servicos/:id', ServicoController.delete); 

// Rota de Agendamentos
routes.get('/agendamentos-admin', AgendamentoController.index);

// Rotas de Usuários
routes.get('/usuarios', UsuarioController.listar);
routes.get('/perfil', UsuarioController.perfil);

// Rota dos questionários
routes.get('/questionarios-admin', QuestionarioController.index); 

// CRUD de Prontuários
routes.get('/prontuarios', ProntuarioController.index);
routes.get('/prontuarios/:id', ProntuarioController.show);
routes.post('/prontuarios', ProntuarioController.store);
routes.put('/prontuarios/:id', ProntuarioController.update);
routes.delete('/prontuarios/:id', ProntuarioController.delete);

// 3. Exportação do Módulo
module.exports = routes;