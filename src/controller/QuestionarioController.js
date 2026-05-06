const AppDataSource = require('../database/database');
const RespostaQuestionario = require('../app/Entities/RespostaQuestionario');

const QuestionarioController = {
  async store(req, res) {
    try {
      const repository = AppDataSource.getRepository(RespostaQuestionario);
      const dados = req.body;
      const novo = repository.create(dados);
      await repository.save(novo);
      return res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao salvar questionário:', err);
      return res.status(500).json({ error: 'Erro ao salvar questionário' });
    }
  },

  async index(req, res) {
    try {
      const repository = AppDataSource.getRepository(RespostaQuestionario);
      const todos = await repository.find();
      return res.status(200).json(todos);
    } catch (err) {
      console.error('Erro ao listar questionários:', err);
      return res.status(500).json({ error: 'Erro ao listar questionários' });
    }
  },

  async excluirDuplicados(req, res) {
    try {
      const repository = AppDataSource.getRepository(RespostaQuestionario);
      const todos = await repository.find();

      const vistos = new Set();
      const duplicados = [];

      for (const q of todos) {
        const chave = `${q.nome}-${q.email}-${new Date(q.createdAt).toDateString()}`;
        if (vistos.has(chave)) {
          duplicados.push(q.id);
        } else {
          vistos.add(chave);
        }
      }

      if (duplicados.length > 0) {
        await repository.delete(duplicados);
      }

      return res.status(200).json({ removidos: duplicados.length });
    } catch (err) {
      console.error('Erro ao excluir questionários duplicados:', err);
      return res.status(500).json({ error: 'Erro ao excluir duplicados' });
    }
  },
};

module.exports = QuestionarioController;
