"use strict";
module.exports = class CreateTableAgendamento1761876602931 { // Use o seu timestamp

    async up(queryRunner) {
        await queryRunner.query(
            `CREATE TABLE agendamentos (
                id INT NOT NULL AUTO_INCREMENT,
                serviceId INTEGER NOT NULL,
                date DATE NOT NULL,
                time VARCHAR(5) NOT NULL,
                name VARCHAR(200) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(200) NOT NULL,
                notes TEXT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            )`
        );
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "agendamentos"`);
    }
}