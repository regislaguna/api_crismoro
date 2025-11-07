/*
* Ficheiro: src/app/controller/QuestionarioController.js
* (CORRIGIDO: Converte manualmente os Arrays para JSON)
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

      // --- ESTA É A CORREÇÃO MANUAL ---
      // O frontend envia 'motivos' como um Array: ["celulite", "flacidez"]
      // O MySQL (coluna TEXT) só aceita uma string: '["celulite", "flacidez"]'
      // O JSON.stringify faz essa conversão.
      
      const dadosParaSalvar = {
        ...dadosFormulario, // Pega todos os campos (nome, email, etc.)
        
        // Converte manualmente os campos que são Arrays
        motivos: JSON.stringify(dadosFormulario.motivos),
        area_interesse: JSON.stringify(dadosFormulario.area_interesse),
        historico_doencas: JSON.stringify(dadosFormulario.historico_doencas),
      };
      // --- FIM DA CORREÇÃO ---

      const resposta = repository.create(dadosParaSalvar); // Salva os dados convertidos
      await repository.save(resposta);
      
      return res.status(201).json(resposta);

    } catch (err) {
      console.error("Erro no QuestionarioController:", err);
      return res.status(500).json({ error: err.message });
    }
  }
  
  // (O método 'index' permanece igual)
  async index(req, res) {
    try {
      const repository = AppDataSource.getRepository(RespostaQuestionario);
      const respostas = await repository.find();
      // (Opcional: Converter de volta para JSON para o frontend)
      const respostasConvertidas = respostas.map(r => ({
        ...r,
        motivos: JSON.parse(r.motivos || '[]'),
        area_interesse: JSON.parse(r.area_interesse || '[]'),
        historico_doencas: JSON.parse(r.historico_doencas || '[]'),
      }));
      return res.status(200).json(respostasConvertidas);
    } catch (err) {
      console.error("Erro no QuestionarioController (index):", err);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new QuestionarioController();