 "use strict";

module.exports = class AdicionarHistoricoTratamentos1778045350199  {
    name = 'AdicionarHistoricoTratamentos1778045350199'

    async up(queryRunner){
        await queryRunner.query(`ALTER TABLE \`prontuarios\` DROP COLUMN \`ultimo_tratamento\``);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` DROP COLUMN \`tempo_tratamento\``);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` ADD \`historico_tratamentos\` text NULL COMMENT 'Guarda um array JSON contendo múltiplos tratamentos, datas de sessões e relatos.'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`servicos\` CHANGE \`descricao\` \`descricao\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`servicos\` CHANGE \`image\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`endereco\` \`endereco\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`tratamento_previo\` \`tratamento_previo\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`motivos\` \`motivos\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`area_interesse\` \`area_interesse\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`tipo_sanguineo\` \`tipo_sanguineo\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`teve_covid\` \`teve_covid\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`vacina_covid\` \`vacina_covid\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`historico_doencas\` \`historico_doencas\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`retencao_liquidos\` \`retencao_liquidos\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`cansaco_excessivo\` \`cansaco_excessivo\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`pratica_fisica\` \`pratica_fisica\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`alimentacao\` \`alimentacao\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`dieta\` \`dieta\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`bebida\` \`bebida\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`idade_menarca\` \`idade_menarca\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`ciclo_menstrual\` \`ciclo_menstrual\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`contraceptivo\` \`contraceptivo\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`tipo_contraceptivo\` \`tipo_contraceptivo\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`telefone\` \`telefone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`comorbidades\` \`comorbidades\` varchar(255) NULL COMMENT 'Alergias, diabetes, hipertensão, etc.'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`situacao_pele_corpo\` \`situacao_pele_corpo\` varchar(255) NULL COMMENT 'Fototipo, oleosidade, grau de celulite, etc.'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`produtos_maquinas\` \`produtos_maquinas\` text NULL COMMENT 'Guardado como JSON ou String com as máquinas/produtos usados'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`anotacoes_clinicas\` \`anotacoes_clinicas\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`descricao\` \`descricao\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`img_url\` \`img_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`valor\` \`valor\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`agendamentos\` CHANGE \`notes\` \`notes\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`agendamentos\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

  async down(queryRunner){
        await queryRunner.query(`ALTER TABLE \`agendamentos\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`agendamentos\` CHANGE \`notes\` \`notes\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`valor\` \`valor\` decimal(10,2) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`img_url\` \`img_url\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`produtos\` CHANGE \`descricao\` \`descricao\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`anotacoes_clinicas\` \`anotacoes_clinicas\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`produtos_maquinas\` \`produtos_maquinas\` text NULL COMMENT 'Guardado como JSON ou String com as máquinas/produtos usados' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`situacao_pele_corpo\` \`situacao_pele_corpo\` varchar(255) NULL COMMENT 'Fototipo, oleosidade, grau de celulite, etc.' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`comorbidades\` \`comorbidades\` varchar(255) NULL COMMENT 'Alergias, diabetes, hipertensão, etc.' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`telefone\` \`telefone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`tipo_contraceptivo\` \`tipo_contraceptivo\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`contraceptivo\` \`contraceptivo\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`ciclo_menstrual\` \`ciclo_menstrual\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`idade_menarca\` \`idade_menarca\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`bebida\` \`bebida\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`dieta\` \`dieta\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`alimentacao\` \`alimentacao\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`pratica_fisica\` \`pratica_fisica\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`cansaco_excessivo\` \`cansaco_excessivo\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`retencao_liquidos\` \`retencao_liquidos\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`historico_doencas\` \`historico_doencas\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`vacina_covid\` \`vacina_covid\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`teve_covid\` \`teve_covid\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`tipo_sanguineo\` \`tipo_sanguineo\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`area_interesse\` \`area_interesse\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`motivos\` \`motivos\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`tratamento_previo\` \`tratamento_previo\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`respostas_questionario\` CHANGE \`endereco\` \`endereco\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`servicos\` CHANGE \`image\` \`image\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`servicos\` CHANGE \`descricao\` \`descricao\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` DROP COLUMN \`historico_tratamentos\``);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` ADD \`tempo_tratamento\` varchar(255) NULL COMMENT 'Duração do tratamento ou número de sessões' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`prontuarios\` ADD \`ultimo_tratamento\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
