/*
* Ficheiro: src/app/controller/ServiceController.js
* (VERSÃO FINAL CORRIGIDA - Alinhada com a Entidade)
*/
const AppDataSource = require('../database/database'); 
const Servico = require("../app/Entities/Servico"); 
const servicoRepository = AppDataSource.getRepository(Servico);

const ServiceController = {
  
  store: async (req, res) => {
    try {
      // 1. Extrai o ID do utilizador (do authMiddleware)
      const usuarioAuthId = req.usuarioId; 
      
      // 2. Extrai os dados do frontend (title, description, price, image)
      const { title, description, price, image } = req.body;

      if (!title || !price || !usuarioAuthId) {
        return res.status(400).json({ erro: "Campos obrigatórios em falta (title, price, usuarioAuthId)" });
      }

      // 3. Mapeia os dados do Frontend para a Entidade
      const novoServico = servicoRepository.create({
        nome: title,        // 'title' (frontend) -> 'nome' (banco de dados)
        descricao: description,
        price: price,     // 'price' (frontend) -> 'price' (banco de dados)
        image: image,     // 'image' (frontend) -> 'image' (banco de dados)
        usuario_id: usuarioAuthId 
      });

      const servicoSalvo = await servicoRepository.save(novoServico);
      return res.status(201).json(servicoSalvo);

    } catch (err) {
      console.error("Erro em store:", err); 
      return res.status(500).json({ erro: "Falha ao salvar o serviço.", details: err.message });
    }
  },

  index: async (req, res) => {
    try {
      // O '.find()' agora vai usar a Entidade 'Servico.js' (que está correta)
      const servicos = await servicoRepository.find();
      return res.status(200).json(servicos);
    } catch (err) {
      console.error("Erro em index:", err);
      return res.status(500).json({ erro: "Falha ao listar os serviços." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, image } = req.body;

      const servico = await servicoRepository.findOneBy({ id: parseInt(id) });
      if (!servico) {
        return res.status(404).json({ erro: 'Serviço não encontrado' });
      }

      servicoRepository.merge(servico, {
        nome: title,
        descricao: description,
        price: price,
        image: image,
      });

      const servicoAtualizado = await servicoRepository.save(servico);
      return res.status(200).json(servicoAtualizado);
    } catch (err) {
      console.error("Erro em update:", err);
      return res.status(500).json({ erro: "Falha ao atualizar o serviço." });
_   }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const servico = await servicoRepository.findOneBy({ id: parseInt(id) });

      if (!servico) {
        return res.status(404).json({ erro: 'Serviço não encontrado' });
      }

      await servicoRepository.delete(id);
      return res.status(204).send();
    } catch (err) {
      console.error("Erro em delete:", err);
      return res.status(500).json({ erro: "Falha ao excluir o serviço." });
    }
  }
}

module.exports = ServiceController;