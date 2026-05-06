"use strict";

module.exports = class CreateTableQuestionario1761876421599 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE respostas_questionario (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(200) NOT NULL,
        endereco VARCHAR(255),
        email VARCHAR(200) NOT NULL,
        telefone VARCHAR(50) NOT NULL,
        motivo_consulta TEXT NOT NULL,
        tratamento_previo VARCHAR(10),
        motivos TEXT,
        area_interesse TEXT,
        historico_saude TEXT NOT NULL,
        tipo_sanguineo VARCHAR(20),
        teve_covid VARCHAR(10),
        vacina_covid VARCHAR(10),
        historico_doencas TEXT,
        retencao_liquidos VARCHAR(10),
        cansaco_excessivo VARCHAR(10),
        pratica_fisica VARCHAR(20),
        alimentacao VARCHAR(20),
        dieta VARCHAR(10),
        bebida VARCHAR(10),
        alimentacao_rotina TEXT NOT NULL,
        idade_menarca VARCHAR(10),
        ciclo_menstrual VARCHAR(10),
        contraceptivo VARCHAR(10),
        tipo_contraceptivo VARCHAR(50),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE respostas_questionario`);
  }
};
