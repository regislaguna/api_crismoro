/*
* Ficheiro: src/app/controller/UsuarioController.js
* (CORRIGIDO: O 'listar' e o retorno do 'login' foram atualizados)
*/

const AppDataSource = require('../database/database'); // 
const Usuario = require("../app/Entities/Usuario")
const usuarioRepository = AppDataSource.getRepository(Usuario);

// const Usuarios = require("../models/Usuarios"); // DEPOIS: Apagámos os dados mockados

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'S3CR3TK3Y'; // DEPOIS: É melhor ler do .env

const UsuarioController = {
    login: async (req, res) => {
        const { email, senha } = req.body;
        if(!email || !senha) {
            return res.status(400).json({erro: 'Email e senha sao obrigatorios.'})
        }
        
        const usuario = await usuarioRepository.findOne({ where: {email}});
        if(!usuario) {
            return res.status(401).json({ erro: 'Credenciais inválidas'})
        }
        
        // O seu código aqui está CORRETO. Ele vai funcionar
        // depois que você executar o UPDATE do Passo 1.
        const senhaValida = bcrypt.compareSync(senha, usuario.senha)
        if(!senhaValida) {
            return res.status(401).json({ erro: 'Credenciais invalidas'})
        }

        const token = jwt.sign(
            {id: usuario.id, nome: usuario.nome},
            SECRET_KEY, 
            {expiresIn: '8h'} // DEPOIS: Aumentei para 8h
        )

        // --- CORREÇÃO AQUI ---
        // DEPOIS: O frontend espera um objeto { token, user }
        const { senha: _, ...user } = usuario; // Remove a senha
        return res.status(200).json({
          token: token,
          user: user
        });
    },

    register: async (req, res) => {
      // O seu register já está perfeito e a usar o hash.
        const {nome, email, senha} = req.body;
        if(!email || !senha || !nome) {
            return res.status(400).json({erro: "preencha os campos obrigatorios"})
        }
        const emailExistente = await usuarioRepository.findOne({ where: {email}});
        if(emailExistente) {
            return res.status(400).json({erro: "Este email ja esta sendo utilizado"})
        }

        const salt = bcrypt.genSaltSync(10);
        const senhaHash = bcrypt.hashSync(senha, salt);
        
        const novoUsuario = {
            nome,
            email,
            senha: senhaHash,
        }
        const usuarioSalvo = await usuarioRepository.save(novoUsuario);
        const { senha:_, ...usuarioContext} = usuarioSalvo;

        return res.status(201).json({
            mensagem: "Usuario registrado com sucesso",
            data: usuarioContext
        })
    },

    // --- CORREÇÃO AQUI ---
    listar: async (req, res) => {
      // DEPOIS: Alterado de 'Usuarios' (mock) para 'usuarioRepository' (banco de dados)
      try {
        const usuarios = await usuarioRepository.find();
        return res.status(200).json(usuarios);
      } catch (err) {
        return res.status(500).json({ erro: 'Falha ao listar usuários.' });
      }
    },

    perfil: async (req, res) => {
      // O seu 'perfil' já está perfeito.
        const usuarioAuthId = req.usuarioId;
        const usuario = await usuarioRepository.findOneBy({id: usuarioAuthId});
        if(!usuario) {
            return res.status(404).json(
                { erro: 'Usuario nao encontrado'})
        }
        const { senha: _, ...perfilData} = usuario;
        
        return res.status(200).json(perfilData);
    }
}

module.exports = UsuarioController;