"use strict";

module.exports = class CreateTableUsuario1762390338208 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE usuarios (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        deleted_at TIMESTAMP(6),
        PRIMARY KEY (id)
      )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE usuarios`);
  }
};
