const { EntitySchema } = require('typeorm');

const Agendamento = new EntitySchema({
  name: 'Agendamento',
  tableName: 'agendamentos',
  columns: {
    id: { type: 'int', primary: true, generated: 'increment' },
    serviceId: { type: 'int', nullable: false },
    date: { type: 'date', nullable: false },
    time: { type: 'varchar', length: 5, nullable: false },
    name: { type: 'varchar', length: 200, nullable: false },
    phone: { type: 'varchar', length: 20, nullable: false },
    email: { type: 'varchar', length: 200, nullable: false },
    notes: { type: 'text', nullable: true },
    createdAt: { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' },
  },
});

module.exports = Agendamento;
