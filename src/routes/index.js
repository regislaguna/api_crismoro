const { Router } = require('express');

// Importe o seu multer recém-criado
const upload = require('../configs/multer'); 

const ServicoController = require('../controller/ServicoController');
const AgendamentoController = require('../controller/AgendamentoController');
const QuestionarioController = require('../controller/QuestionarioController');
const UsuarioController = require('../controller/UsuarioController'); 
const authMiddleware = require('../middleware/authMiddleware');

const routes = Router();

// --- Rotas Públicas ---
routes.post('/register', UsuarioController.register);
routes.post('/login', UsuarioController.login);
routes.get('/servicos', ServicoController.index);
routes.post('/agendamentos', AgendamentoController.store);
routes.post('/questionario', QuestionarioController.store);

// ATENÇÃO AQUI: Verifique se o seu Frontend envia a foto com o nome 'image' ou 'foto'.
// Se for 'foto', mude para upload.single('foto')
routes.post('/servicos', upload.single('image'), ServicoController.store); 
routes.put('/servicos/:id', upload.single('image'), ServicoController.update);

// --- Rotas Privadas (Admin) ---
routes.use(authMiddleware); 


routes.delete('/servicos/:id', ServicoController.delete);

routes.get('/agendamentos-admin', AgendamentoController.index);
routes.get('/usuarios', UsuarioController.listar);
routes.get('/perfil', UsuarioController.perfil);

module.exports = routes;