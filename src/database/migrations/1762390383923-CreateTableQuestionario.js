 "use strict";
module.exports = class CreateTableQuestionario1761876421599 { // Use o seu timestamp

    async up(queryRunner) {
        await queryRunner.query(
            `CREATE TABLE respostas_questionario (
                id INT NOT NULL AUTO_INCREMENT,
                nome VARCHAR(200) NOT NULL,
                endereco VARCHAR(255) NULL,
                email VARCHAR(200) NOT NULL,
                telefone VARCHAR(50) NOT NULL,
                motivo_consulta TEXT NOT NULL,
                tratamento_previo VARCHAR(10) NULL,
                motivos TEXT NULL,
                area_interesse TEXT NULL,
                historico_saude TEXT NOT NULL,
                tipo_sanguineo VARCHAR(20) NULL,
                teve_covid VARCHAR(10) NULL,
                vacina_covid VARCHAR(10) NULL,
                historico_doencas TEXT NULL,
                retencao_liquidos VARCHAR(10) NULL,
                cansaco_excessivo VARCHAR(10) NULL,
                pratica_fisica VARCHAR(20) NULL,
                alimentacao VARCHAR(20) NULL,
                dieta VARCHAR(10) NULL,
                bebida VARCHAR(10) NULL,
                alimentacao_rotina TEXT NOT NULL,
                idade_menarca VARCHAR(10) NULL,
                ciclo_menstrual VARCHAR(10) NULL,
                contraceptivo VARCHAR(10) NULL,
                tipo_contraceptivo VARCHAR(50) NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            )`
        );
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "respostas_questionario"`);
    }
}