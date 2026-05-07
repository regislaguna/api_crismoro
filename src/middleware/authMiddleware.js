const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const AppDataSource = require('../database/database');
const Usuario = require("../app/Entities/Usuario");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ erro: 'Header authorization não encontrado' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ erro: 'Token com formato inválido' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ erro: 'Token mal formatado' });
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }

    if (!AppDataSource.isInitialized) {
      return res.status(500).json({ erro: 'DataSource não inicializado' });
    }

    try {
      const usuarioRepository = AppDataSource.getRepository(Usuario);
      const usuario = await usuarioRepository.findOneBy({ id: decoded.id });

      if (!usuario) {
        return res.status(401).json({ erro: 'Usuário do token não encontrado' });
      }

      req.usuarioId = usuario.id;
      console.log('✅ Usuário autenticado:', usuario.id);
      return next();
    } catch (error) {
      console.error('Erro no authMiddleware:', error);
      return res.status(500).json({ erro: 'Erro interno na autenticação' });
    }
  });
};

module.exports = authMiddleware;
