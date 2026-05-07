/*
* Ficheiro: src/app/Entities/Prontuario.js
* Documentação: Tabela de prontuários atualizada para suportar a linha do tempo evolutiva (tratamentos e sessões).
*/
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Prontuario",
  tableName: "prontuarios",
  columns: {
    // --- IDENTIFICAÇÃO ---
    id: { primary: true, type: "int", generated: true },
    nome: { type: "varchar" },
    email: { type: "varchar", nullable: true },
    telefone: { type: "varchar", nullable: true },
    
    // --- AVALIAÇÃO E ALERTAS ---
    comorbidades: {
      type: "varchar",
      nullable: true,
      comment: "Alergias, diabetes, hipertensão, etc."
    },
    situacao_pele_corpo: {
      type: "varchar",
      nullable: true,
      comment: "Fototipo, oleosidade, grau de celulite, etc."
    },
    produtos_maquinas: {
      type: "text",
      nullable: true,
      comment: "Guardado como JSON ou String com as máquinas/produtos usados"
    },
    
    // --- NOVO: LINHA DO TEMPO CLÍNICA (EVOLUÇÃO) ---
    historico_tratamentos: {
      type: "text",
      nullable: true,
      comment: "Guarda um array JSON contendo múltiplos tratamentos, datas de sessões e relatos."
    },
    
    // --- OBSERVAÇÕES GERAIS ---
    anotacoes_clinicas: { 
      type: "text", 
      nullable: true 
    }, 
    
    // --- CONTROLE DE DATAS ---
    createdAt: { name: 'created_at', type: "timestamp", createDate: true },
    updatedAt: { name: 'updated_at', type: "timestamp", updateDate: true }
  }
});