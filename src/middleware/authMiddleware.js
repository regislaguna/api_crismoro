/*
* Ficheiro: src/app/middleware/authMiddleware.js
* (CORRIGIDO - getRepository movido para dentro da função)
*/
const jwt = require('jsonwebtoken');
// const Usuarios = require('../models/Usuarios'); // Você não está a usar isto, pode apagar
const SECRET_KEY = 'S3CR3TK3Y'; // Lembre-se de mover isto para o seu .env!

const AppDataSource = require('../database/database'); // 
const Usuario = require("../app/Entities/Usuario");
// DEIXE ESTA LINHA COMENTADA OU APAGUE-A. NÃO PODE FICAR AQUI.
// const usuarioRepository = AppDataSource.getRepository(Usuario); 

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({erro: 'Header authorization nao encontrado'})
    }
    // estrategia de autorizacao usando "Bearer TOKEN"
    const parts = authHeader.split(' ');
    console.log(parts)
    if(parts.length !== 2) {
        return res.status(401).json({ erro: 'Token com formato invalido'})
    }
    const [scheme, token] = parts;

    // A verificação do 'scheme' (Bearer) também é uma boa prática
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ erro: 'Token mal formatado' });
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if(err) {
            return res.status(401).json({erro: 'Token invalido ou expirado.'})
        }

        // --- CORREÇÃO APLICADA AQUI ---
        // DEPOIS: Mova o getRepository para DENTRO da função
        const usuarioRepository = AppDataSource.getRepository(Usuario);
        // --- FIM DA CORREÇÃO ---

        const usuario = await usuarioRepository.findOneBy({id: decoded.id});
        if(!usuario) {
            return res.status(401).json({ erro: 'usuario do token nao encontrado'})
        }
        req.usuarioId = usuario.id;

        return next();
    } )
}

module.exports = authMiddleware;