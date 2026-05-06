/*
* Ficheiro: src/app/Entities/Servico.js
* (VERSÃO FINAL CORRIGIDA - Alinhada com a Migração)
*/
const { EntitySchema } = require('typeorm');

const Servico = new EntitySchema({
  name: 'Servico', // O nome que o getRepository usa
  tableName: 'servicos', // O nome da sua tabela no MySQL
  columns: {
    id: { type: 'int', primary: true, generated: 'increment' },
    
    // Corresponde ao 'nome' na sua migração
    nome: { type: 'varchar', length: 100, nullable: false },
    
    // Corresponde ao 'descricao' na sua migração
    descricao: { type: 'text', nullable: true },
    
    // Corresponde ao 'price' na sua migração
    price: { type: 'decimal', precision: 10, scale: 2, nullable: false },
    
    // Corresponde ao 'image' (URL) na sua migração
    image: { type: 'varchar', length: 255, nullable: true },
    
    // Corresponde ao 'usuario_id' na sua migração
    usuario_id: { type: 'int', nullable: false },
  },
  
  // Define a Relação com a tabela 'usuarios'
  relations: {
      usuario: {
          target: 'Usuario',
          type: 'many-to-one',
          joinColumn: { name: 'usuario_id' }
      }
  }
});

module.exports = Servico;