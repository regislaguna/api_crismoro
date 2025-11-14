// metodos funcoes o que faz acoes
//com banco de dados
const AppDataSource = require('../database/database'); // 
const Produto = require("../app/Entities/Produto")
const produtoRepository = AppDataSource.getRepository(Produto);

const ProdutoController = {
    
    create: async (req, res) => {
        const usuarioAuthId = req.usuarioId;
        const {nome, descricao, valor, img_url} = req.body;
        if(!nome) {
            return res.status(400).json({erro: "preencha os campos obrigatorios"})
        }
        const novoProduto = {
            nome,
            descricao,
            valor,
            img_url,
            usuario_id: usuarioAuthId
        }
        const produtoSalvo = await produtoRepository.save(novoProduto);
        return res.status(201).json({
            mensagem: "Produto registrado com sucesso",
            data: produtoSalvo
        })
    },
    listar: async (req, res) => {
        const produtos = await produtoRepository.find();
        return res.status(200).json(produtos);
    },
}

module.exports = ProdutoController;