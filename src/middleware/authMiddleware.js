const jwt = require('jsonwebtoken');
const AppDataSource = require('../database/database'); 
const Usuario = require("../app/Entities/Usuario");
const authConfig = require('../../configs/auth'); // Ajuste o caminho se necessário

const { secret } = authConfig().jwt; 

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if(!authHeader) {
            return res.status(401).json({erro: 'Header authorization não encontrado'});
        }
        
        // Separa o "Bearer" do token em si
        const parts = authHeader.split(' ');
        
        if(parts.length !== 2) {
            return res.status(401).json({ erro: 'Token com formato inválido'});
        }
        
        const [scheme, tokenValidado] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ erro: 'Token mal formatado' });
        }

        // Verifica o token
        jwt.verify(tokenValidado, secret, async (err, decoded) => {
            if(err) {
                return res.status(401).json({erro: 'Token inválido ou expirado.'});
            }

            const usuarioRepository = AppDataSource.getRepository(Usuario);
            const usuario = await usuarioRepository.findOneBy({id: decoded.id});
            
            if(!usuario) {
                return res.status(401).json({ erro: 'Usuário do token não encontrado'});
            }
            
            req.usuarioId = usuario.id;
            return next();
        });
    } catch (error) {
        console.error("Erro no middleware de auth:", error);
        return res.status(500).json({ erro: 'Erro interno na validação.' });
    }
}

module.exports = authMiddleware;