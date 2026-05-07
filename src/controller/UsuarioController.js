/*
 * Ficheiro: src/app/controller/UsuarioController.js
 * STATUS: Versão Final de Produção (Railway + Vercel)
 */

const AppDataSource = require('../database/database');
const Usuario = require("../app/Entities/Usuario");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth'); // Importando sua config centralizada

const UsuarioController = {
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const usuarioRepository = AppDataSource.getRepository(Usuario);

            if (!email || !senha) {
                return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
            }

            // Busca o usuário no banco
            const usuario = await usuarioRepository.findOne({ where: { email } });
            
            if (!usuario) {
                return res.status(401).json({ erro: 'Credenciais inválidas' });
            }

            // Compara a senha digitada com o hash do banco
            const senhaValida = bcrypt.compareSync(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: 'Credenciais inválidas' });
            }

            // Pega a secret da sua config centralizada
            const { secret } = authConfig().jwt;

            // Gera o Token JWT
            const token = jwt.sign(
                { id: usuario.id, nome: usuario.nome },
                secret,
                { expiresIn: '8h' }
            );

            // Remove a senha do objeto de retorno por segurança
            const { senha: _, ...userInfo } = usuario;

            return res.status(200).json({
                token: token,
                user: userInfo
            });
        } catch (error) {
            console.error('Erro no Login:', error);
            return res.status(500).json({ erro: 'Erro interno no servidor.' });
        }
    },

    register: async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
            const usuarioRepository = AppDataSource.getRepository(Usuario);

            if (!email || !senha || !nome) {
                return res.status(400).json({ erro: "Preencha todos os campos obrigatórios." });
            }

            const emailExistente = await usuarioRepository.findOne({ where: { email } });
            if (emailExistente) {
                return res.status(400).json({ erro: "Este e-mail já está sendo utilizado." });
            }

            // Criptografia da senha
            const salt = bcrypt.genSaltSync(10);
            const senhaHash = bcrypt.hashSync(senha, salt);

            const novoUsuario = usuarioRepository.create({
                nome,
                email,
                senha: senhaHash,
            });

            const usuarioSalvo = await usuarioRepository.save(novoUsuario);
            const { senha: _, ...usuarioContext } = usuarioSalvo;

            return res.status(201).json({
                mensagem: "Usuário registrado com sucesso",
                data: usuarioContext
            });
        } catch (error) {
            console.error('Erro no Registro:', error);
            return res.status(500).json({ erro: 'Erro ao registrar usuário.' });
        }
    },

    listar: async (req, res) => {
        try {
            const usuarioRepository = AppDataSource.getRepository(Usuario);
            const usuarios = await usuarioRepository.find();
            
            // Remove as senhas de todos os usuários da lista antes de enviar
            const usuariosSemSenha = usuarios.map(u => {
                const { senha: _, ...dados } = u;
                return dados;
            });

            return res.status(200).json(usuariosSemSenha);
        } catch (err) {
            console.error('Erro ao listar:', err);
            return res.status(500).json({ erro: 'Falha ao listar usuários.' });
        }
    },

    perfil: async (req, res) => {
        try {
            const usuarioRepository = AppDataSource.getRepository(Usuario);
            const usuarioAuthId = req.usuarioId; // Definido pelo authMiddleware

            const usuario = await usuarioRepository.findOneBy({ id: usuarioAuthId });
            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }

            const { senha: _, ...perfilData } = usuario;
            return res.status(200).json(perfilData);
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao buscar perfil.' });
        }
    }
};

module.exports = UsuarioController;