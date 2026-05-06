/*
* Ficheiro: src/app/controller/ServiceController.js
* (CORRIGIDO: getRepository movido para dentro dos métodos)
*/
const AppDataSource = require('../database/database');
const Servico = require("../app/Entities/Servico"); 
// DEPOIS: Apagámos o servicoRepository daqui

const ServicoController = {
  
  store: async (req, res) => {
    try {
      const servicoRepository = AppDataSource.getRepository(Servico);
      const usuarioAuthId = req.usuarioId; 
      const { title, description, price, image } = req.body;
      if (!title || !price || !usuarioAuthId) {
        return res.status(400).json({ erro: "Campos obrigatórios em falta (title, price, usuarioAuthId)" });
      }
      const novoServico = servicoRepository.create({
        nome: title,
        descricao: description,
        price: price,
        image: image,
        usuario_id: usuarioAuthId 
      });
      const servicoSalvo = await servicoRepository.save(novoServico);
      return res.status(201).json(servicoSalvo);
    } catch (err) {
      console.error("Erro em store (serviço):", err); 
      return res.status(500).json({ erro: "Falha ao salvar o serviço.", details: err.message });
    }
  },

  index: async (req, res) => {
    try {
      const servicoRepository = AppDataSource.getRepository(Servico);
      const servicos = await servicoRepository.find();
      return res.status(200).json(servicos);
    } catch (err) {
      console.error("Erro em index (serviço):", err);
      return res.status(500).json({ erro: "Falha ao listar os serviços." });
    }
  },

  update: async (req, res) => {
    try {
      const servicoRepository = AppDataSource.getRepository(Servico);
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
      console.error("Erro em update (serviço):", err);
      return res.status(500).json({ erro: "Falha ao atualizar o serviço." });
    }
  },

  delete: async (req, res) => {
    try {
      const servicoRepository = AppDataSource.getRepository(Servico);
      const { id } = req.params;
      const servico = await servicoRepository.findOneBy({ id: parseInt(id) });
      if (!servico) {
        return res.status(404).json({ erro: 'Serviço não encontrado' });
      }
      await servicoRepository.delete(id);
      return res.status(204).send();
    } catch (err) {
      console.error("Erro em delete (serviço):", err);
      return res.status(500).json({ erro: "Falha ao excluir o serviço." });
    }
  }
}
module.exports = ServicoController;