/*
* Ficheiro: src/app/controller/AgendamentoController.js
* (ATUALIZADO com a função generatePDF e correção do getRepository)
*/

const AppDataSource = require('../database/database');
const Agendamento = require('../app/Entities/Agendamento'); 
const PDFDocument = require('pdfkit'); // DEPOIS: Importamos o gerador de PDF
const { Between } = require('typeorm');  // DEPOIS: Importamos o filtro de data

class AgendamentoController {
  
  async store(req, res) {
    try {
      // DEPOIS: 'getRepository' movido para dentro
      const repository = AppDataSource.getRepository(Agendamento);
      const { serviceId, date, time, name, phone, email, notes } = req.body;

      if (!serviceId || !date || !time || !name || !phone || !email) {
        return res.status(400).json({ error: 'Campos obrigatórios em falta.' });
      }

      const agendamento = repository.create({
        serviceId, date, time, name, phone, email, notes
      });

      await repository.save(agendamento);
      return res.status(201).json(agendamento);

    } catch (err) {
      console.error("Erro no AgendamentoController:", err); 
      return res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      // DEPOIS: 'getRepository' movido para dentro
      const repository = AppDataSource.getRepository(Agendamento);
      const agendamentos = await repository.find({
        order: {
          date: 'DESC',
          time: 'ASC'
        }
      });
      return res.status(200).json(agendamentos);
    } catch (err) {
      console.error("Erro no AgendamentoController (index):", err);
      return res.status(500).json({ error: err.message });
    }
  }

  async excluirDuplicados(req, res) {
    try {
      // DEPOIS: 'getRepository' movido para dentro
      const repository = AppDataSource.getRepository(Agendamento);
      const todos = await repository.find();

      const vistos = new Set();
      const duplicados = [];

      for (const ag of todos) {
        const chave = `${ag.name}-${ag.email}-${new Date(ag.date).toDateString()}`;
        if (vistos.has(chave)) {
          duplicados.push(ag.id);
        } else {
          vistos.add(chave);
        }
      }

      if (duplicados.length > 0) {
        await repository.delete(duplicados);
      }

      return res.status(200).json({ removidos: duplicados.length });
    } catch (err) {
      console.error('Erro ao excluir agendamentos duplicados:', err);
      return res.status(500).json({ error: 'Erro ao excluir duplicados' });
    }
  }

  // DEPOIS: ESTA É A NOVA FUNÇÃO QUE GERA O PDF
  async generatePDF(req, res) {
    console.log("A gerar relatório PDF de Agendamentos...");
    try {
        const { dataInicio, dataFim } = req.query; // Pega as datas do frontend
        // DEPOIS: 'getRepository' movido para dentro
        const repository = AppDataSource.getRepository(Agendamento);

        let whereClause = {};

        // Se o frontend enviou as datas, filtra por elas
        // Nota: O campo no banco chama-se 'date'
        if (dataInicio && dataFim && dataInicio !== '' && dataFim !== '') {
            whereClause.date = Between(
                new Date(dataInicio),
                new Date(dataFim)
            );
        }

        const agendamentos = await repository.find({ 
          where: whereClause,
          order: { date: 'ASC', time: 'ASC' } 
        });

        if (agendamentos.length === 0) {
            return res.status(404).json({ erro: "Nenhum agendamento encontrado para este período." });
        }

        // --- Inicia a Geração do PDF ---
        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio-agendamentos.pdf');
        doc.pipe(res); // Envia o PDF para o frontend

        // --- Adiciona Conteúdo ao PDF ---
        doc.fontSize(18).text('Relatório de Agendamentos', { align: 'center' });
        doc.moveDown();

        if (dataInicio && dataFim && dataInicio !== '' && dataFim !== '') {
            doc.fontSize(12).text(`Período: ${new Date(dataInicio).toLocaleDateString()} até ${new Date(dataFim).toLocaleDateString()}`);
            doc.moveDown();
        }

        doc.fontSize(10).font('Helvetica').text(`Total de agendamentos no período: ${agendamentos.length}`);
        doc.moveDown(1.5);

        // Loop pelos dados do banco
        agendamentos.forEach(ag => {
            doc.fontSize(14).font('Helvetica-Bold').text(`Paciente: ${ag.name} (ID: ${ag.id})`);
            doc.fontSize(10).font('Helvetica')
               .text(`Data: ${new Date(ag.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} às ${ag.time}`)
               .text(`Email: ${ag.email} | Telefone: ${ag.phone}`)
               .text(`Serviço (ID): ${ag.serviceId}`)
               .text(`Notas: ${ag.notes || 'Nenhuma'}`)
               .moveDown(1.5); // Adiciona espaço
        });

        doc.end();

    } catch (err) {
        console.error("Erro ao gerar PDF de Agendamentos:", err);
        res.status(500).json({ erro: "Falha ao gerar o relatório em PDF." });
    }
  }
}

module.exports = new AgendamentoController();