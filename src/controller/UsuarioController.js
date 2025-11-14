/*
* Ficheiro: src/app/controller/UsuarioController.js
* (CORRIGIDO: getRepository movido para dentro dos métodos)
*/

const AppDataSource = require('../database/database');
const Usuario = require('../app/Entities/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'S3CR3TK3Y';

const UsuarioController = {
  // --- Login ---
  login: async (req, res) => {
    try {
      const usuarioRepository = AppDataSource.getRepository(Usuario);
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
      }

      const usuario = await usuarioRepository.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
      }

      const senhaValida = bcrypt.compareSync(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
      }

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        SECRET_KEY,
        { expiresIn: '8h' }
      );

      const { senha: _, ...user } = usuario;
      return res.status(200).json({ token, user });

    } catch (err) {
      console.error('Erro no login:', err);
      return res.status(500).json({ erro: err.message });
    }
  },

  // --- Registro ---
  register: async (req, res) => {
    try {
      const usuarioRepository = AppDataSource.getRepository(Usuario);
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
      }

      const emailExistente = await usuarioRepository.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ erro: 'Este email já está sendo utilizado.' });
      }

      const senhaHash = bcrypt.hashSync(senha, bcrypt.genSaltSync(10));
      const novoUsuario = { nome, email, senha: senhaHash };
      const usuarioSalvo = await usuarioRepository.save(novoUsuario);

      const { senha: _, ...usuarioContext } = usuarioSalvo;
      return res.status(201).json({
        mensagem: 'Usuário registrado com sucesso.',
        data: usuarioContext
      });

    } catch (err) {
      console.error('Erro no register:', err);
      return res.status(500).json({ erro: err.message });
    }
  },

  // --- Listar todos os usuários ---
  listar: async (req, res) => {
    try {
      const usuarioRepository = AppDataSource.getRepository(Usuario);
      const usuarios = await usuarioRepository.find();
      return res.status(200).json(usuarios);
    } catch (err) {
      console.error('Erro no listar (usuários):', err);
      return res.status(500).json({ erro: 'Falha ao listar usuários.' });
    }
  },

  // --- Perfil do usuário autenticado ---
  perfil: async (req, res) => {
    try {
      const usuarioRepository = AppDataSource.getRepository(Usuario);
      const usuarioAuthId = req.usuarioId;

      const usuario = await usuarioRepository.findOneBy({ id: usuarioAuthId });
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      const { senha: _, ...perfilData } = usuario;
      return res.status(200).json(perfilData);

    } catch (err) {
      console.error('Erro no perfil:', err);
      return res.status(500).json({ erro: err.message });
    }
  }
};

module.exports = UsuarioController;
