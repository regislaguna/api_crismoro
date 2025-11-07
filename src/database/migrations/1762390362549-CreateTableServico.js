"use strict";
module.exports = class CreateTableServico1762390362549 { // Use o seu timestamp

    async up(queryRunner) {
        await queryRunner.query(
            // DEPOIS: SQL corrigido para corresponder à Entidade
            `CREATE TABLE servicos (
                id INT NOT NULL AUTO_INCREMENT,
                nome VARCHAR(100) NOT NULL,
                descricao TEXT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image VARCHAR(255) NULL,
                usuario_id INT NOT NULL, 
                PRIMARY KEY (id),
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
            )`
        );
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "servicos"`);
    }
}