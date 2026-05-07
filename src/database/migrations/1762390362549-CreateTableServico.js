"use strict";

module.exports = class CreateTableServico1762390362549 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE servicos (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        descricao TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255),
        usuario_id INT NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT FK_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE servicos`);
  }
};
