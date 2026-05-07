<<<<<<< HEAD
/*
* Ficheiro: src/controller/ServiceController.js
* (VERSÃO BACKEND - ATUALIZADA COM UPLOAD DE IMAGEM MULTER)
* Documentação: Este controlador agora suporta o recebimento de arquivos (req.file) 
* enviados pelo frontend em formato multipart/form-data.
*/
const AppDataSource = require('../database/database'); 
const Servico = require("../app/Entities/Servico"); 
const servicoRepository = AppDataSource.getRepository(Servico);

const ServiceController = {
  
  // ==========================================
  // CRIAR NOVO SERVIÇO (STORE)
  // ==========================================
  store: async (req, res) => {
    try {
      // 1. O ID do usuário vem do seu authMiddleware (automaticamente decodificado do Token)
      const usuarioAuthId = req.usuarioId; 
      
      // 2. Extrai os dados de texto que o React enviou
      const { title, description, price } = req.body;

      // Validação: Verifica se os campos obrigatórios e a autenticação existem
      if (!title || !price || !usuarioAuthId) {
        return res.status(400).json({ 
          erro: "Campos obrigatórios em falta (title, price ou usuarioAuthId)" 
        });
      }

      // 3. Verifica se o Multer capturou uma imagem enviada pelo frontend
      let caminhoImagem = null;
      if (req.file) {
        // Constrói o link público para a imagem salva na pasta uploads
        caminhoImagem = `/uploads/${req.file.filename}`;
      }

      // 4. Mapeia os dados recebidos para as colunas do Banco de Dados
      const novoServico = servicoRepository.create({
        nome: title,        // 'title' no frontend -> 'nome' no banco
        descricao: description,
        price: price,
        image: caminhoImagem, // Guarda o link gerado acima
        usuario_id: usuarioAuthId 
      });

      const servicoSalvo = await servicoRepository.save(novoServico);
      return res.status(201).json(servicoSalvo);

    } catch (err) {
      console.error("Erro em store:", err); 
      return res.status(500).json({ erro: "Falha ao salvar o serviço.", details: err.message });
    }
  },

  // ==========================================
  // LISTAR TODOS OS SERVIÇOS (INDEX)
  // ==========================================
  index: async (req, res) => {
    try {
      const servicos = await servicoRepository.find();
      return res.status(200).json(servicos);
    } catch (err) {
      console.error("Erro em index:", err);
      return res.status(500).json({ erro: "Falha ao listar os serviços." });
    }
  },

  // ==========================================
  // ATUALIZAR SERVIÇO EXISTENTE (UPDATE)
  // ==========================================
  update: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Extraímos apenas os textos do corpo da requisição
      const { title, description, price } = req.body;

      const servico = await servicoRepository.findOneBy({ id: parseInt(id) });
      if (!servico) {
        return res.status(404).json({ erro: 'Serviço não encontrado' });
      }

      // 1. Prepara um objeto apenas com os dados de texto que vieram
      const dadosParaAtualizar = {
        nome: title,
        descricao: description,
        price: price,
      };

      // 2. Se o usuário enviou uma NOVA imagem, atualizamos o caminho.
      // Se não enviou (req.file não existe), a imagem antiga continua intocada no banco.
      if (req.file) {
        dadosParaAtualizar.image = `/uploads/${req.file.filename}`;
      }

      // 3. O comando merge mistura os dados antigos com os dadosAtualizados
      servicoRepository.merge(servico, dadosParaAtualizar);

      const servicoAtualizado = await servicoRepository.save(servico);
      return res.status(200).json(servicoAtualizado);
    } catch (err) {
      console.error("Erro em update:", err);
      return res.status(500).json({ erro: "Falha ao atualizar o serviço." });
    }
  },

  // ==========================================
  // EXCLUIR SERVIÇO (DELETE)
  // ==========================================
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
=======
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
>>>>>>> 176a22d9a86985f120464dcb42d1ce07083b1364
