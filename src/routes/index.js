const { Router } = require('express');
const multer = require('multer'); // 1. Importe o Multer
const path = require('path');

// Configuração do armazenamento das fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // As fotos vão para a pasta 'uploads'
  },
  filename: (req, file, cb) => {
    // Gera um nome único: data-nomeoriginal.jpg
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

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

// --- Rotas Privadas (Admin) ---
routes.use(authMiddleware); 

// --- AQUI ESTÁ A CORREÇÃO CRÍTICA ---
// Adicionamos 'upload.single('image')' para ele entender o formulário com foto
routes.post('/servicos', upload.single('image'), ServicoController.store); 

routes.put('/servicos/:id', upload.single('image'), ServicoController.update);
routes.delete('/servicos/:id', ServicoController.delete);

routes.get('/agendamentos-admin', AgendamentoController.index);
routes.get('/usuarios', UsuarioController.listar);
routes.get('/perfil', UsuarioController.perfil);

module.exports = routes;