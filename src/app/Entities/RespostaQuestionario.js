const { EntitySchema } = require('typeorm');

const RespostaQuestionario = new EntitySchema({
  name: 'RespostaQuestionario',
  tableName: 'respostas_questionario',
  columns: {
    id: { type: 'int', primary: true, generated: 'increment' },

    // Seção 1
    nome: { type: 'varchar', length: 200, nullable: false },
    endereco: { type: 'varchar', nullable: true },
    email: { type: 'varchar', nullable: false },
    telefone: { type: 'varchar', nullable: false },

    // Seção 2
    motivo_consulta: { type: 'text', nullable: false },
    tratamento_previo: { type: 'varchar', length: 10, nullable: true },
    motivos: { type: 'simple-json', nullable: true },
    area_interesse: { type: 'simple-json', nullable: true },

    // Seção 3
    historico_saude: { type: 'text', nullable: false },
    tipo_sanguineo: { type: 'varchar', length: 20, nullable: true },
    teve_covid: { type: 'varchar', length: 10, nullable: true },
    vacina_covid: { type: 'varchar', length: 10, nullable: true },
    historico_doencas: { type: 'simple-json', nullable: true },

    // Seção 4
    retencao_liquidos: { type: 'varchar', length: 10, nullable: true },
    cansaco_excessivo: { type: 'varchar', length: 10, nullable: true },
    pratica_fisica: { type: 'varchar', length: 20, nullable: true },

    // Seção 5
    alimentacao: { type: 'varchar', length: 20, nullable: true },
    dieta: { type: 'varchar', length: 10, nullable: true },
    bebida: { type: 'varchar', length: 10, nullable: true },
    alimentacao_rotina: { type: 'text', nullable: false },

    // Seção 6
    idade_menarca: { type: 'varchar', length: 10, nullable: true },
    ciclo_menstrual: { type: 'varchar', length: 10, nullable: true },
    contraceptivo: { type: 'varchar', length: 10, nullable: true },
    tipo_contraceptivo: { type: 'varchar', length: 50, nullable: true },

    // ✅ Inclusão do campo de perguntas e respostas
    respostas: { type: 'simple-json', nullable: true },

    // Controle
    createdAt: { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' },
  },
});

module.exports = RespostaQuestionario;
