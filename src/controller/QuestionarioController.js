<<<<<<< HEAD
/*
* Ficheiro: src/app/controller/QuestionarioController.js
*/
const AppDataSource = require('../database/database');
const RespostaQuestionario = require('../app/Entities/RespostaQuestionario'); 

class QuestionarioController {
  
  async store(req, res) {
    try {
      const repository = AppDataSource.getRepository(RespostaQuestionario);
      const dadosFormulario = req.body; 

      if (!dadosFormulario.nome || !dadosFormulario.email || !dadosFormulario.motivo_consulta) {
         return res.status(400).json({ error: 'Campos obrigatórios em falta.' });
      }

      // Converte Arrays para String (JSON) antes de salvar no MySQL
      const dadosParaSalvar = {
        ...dadosFormulario,
        motivos: JSON.stringify(dadosFormulario.motivos),
        area_interesse: JSON.stringify(dadosFormulario.area_interesse),
        historico_doencas: JSON.stringify(dadosFormulario.historico_doencas),
      };

      const resposta = repository.create(dadosParaSalvar);
      await repository.save(resposta);
      
      return res.status(201).json(resposta);

    } catch (err) {
      console.error("Erro no QuestionarioController (store):", err);
      return res.status(500).json({ error: err.message });
    }
  }
  
  async index(req, res) {
    try {
      const repository = AppDataSource.getRepository(RespostaQuestionario);
      const respostas = await repository.find();

      // --- PROGRAMAÇÃO DEFENSIVA ---
      // Esta função tenta converter o texto para JSON. Se o MySQL tiver um texto
      // mal formatado que faça o JSON.parse quebrar, o "catch" interno salva o dia.
      const parseSeguro = (valor) => {
        if (!valor) return []; // Se for nulo ou vazio, devolve lista vazia
        try {
          return JSON.parse(valor);
        } catch (e) {
          // Em vez de crashar a aplicação, devolvemos o valor original em formato de texto
          return valor; 
        }
      };

      // Mapeia as respostas utilizando a nossa função defensiva
      const respostasConvertidas = respostas.map(r => ({
        ...r,
        motivos: parseSeguro(r.motivos),
        area_interesse: parseSeguro(r.area_interesse),
        historico_doencas: parseSeguro(r.historico_doencas),
      }));

      // Devolve a lista de forma segura e em formato Array (que o teu React espera!)
      return res.status(200).json(respostasConvertidas);

    } catch (err) {
      console.error("Erro no QuestionarioController (index):", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new QuestionarioController();
=======
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
>>>>>>> 176a22d9a86985f120464dcb42d1ce07083b1364
