const AppDataSource = require('../database/database');
const Agendamento = require('../app/Entities/Agendamento');

class AgendamentoController {
  async store(req, res) {
    try {
      const repository = AppDataSource.getRepository(Agendamento);

      // 🔍 Desestrutura os dados do corpo da requisição
      const { serviceId, date, time, name, phone, email, notes } = req.body;

      // ✅ Validação dos campos obrigatórios
      if (!serviceId || !date || !time || !name || !phone || !email) {
        return res.status(400).json({ error: 'Campos obrigatórios em falta.' });
      }

      // 🔧 Converte serviceId para número (evita erro de tipo)
      const agendamento = repository.create({
        serviceId: parseInt(serviceId, 10),
        date,
        time,
        name,
        phone,
        email,
        notes
      });

      // 💾 Salva no banco
      const resultado = await repository.save(agendamento);

      return res.status(201).json(resultado);
    } catch (err) {
      console.error('Erro no AgendamentoController:', err);
      return res.status(500).json({ error: 'Erro ao salvar agendamento.' });
    }
  }

  async index(req, res) {
    try {
      const repository = AppDataSource.getRepository(Agendamento);
      const agendamentos = await repository.find({ order: { date: 'ASC', time: 'ASC' } });
      return res.status(200).json(agendamentos);
    } catch (err) {
      console.error('Erro no AgendamentoController (index):', err);
      return res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
    }
  }
}

module.exports = new AgendamentoController();
