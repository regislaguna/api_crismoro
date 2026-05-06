/*
* Ficheiro: src/app/controller/RelatorioController.js
* (ATUALIZADO: 'getRepository' movido e 'gerarPDFAgendamentos' adicionado)
*/

const PDFDocument = require('pdfkit');
const AppDataSource = require('../database/database');
const Questionario = require('../app/Entities/RespostaQuestionario');
const Agendamento = require('../app/Entities/Agendamento'); // DEPOIS: Importamos a Entidade Agendamento
const { Between } = require('typeorm'); // DEPOIS: Importamos o 'Between' para as datas

// --- Funções Auxiliares para o PDF de Questionário ---
// (Estas funções ajudam a formatar o PDF)
const parseJsonField = (field) => {
    try {
        const parsed = JSON.parse(field);
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(', ');
        }
        return 'Nenhuma';
    } catch (e) {
        return field || 'N/A';
    }
};
const printTitle = (doc, title) => {
    doc.moveDown(1.5).fontSize(12).font('Helvetica-Bold').text(title);
    doc.lineCap('butt').moveTo(doc.x, doc.y).lineTo(doc.x + 515, doc.y).strokeColor('#cccccc').stroke();
    doc.moveDown(0.5);
};
const printField = (doc, label, value) => {
    doc.fontSize(9).font('Helvetica-Bold').text(label, { continued: true });
    doc.font('Helvetica').text(`: ${value || 'Não preenchido'}`);
};
// --- Fim das Funções Auxiliares ---


const RelatorioController = {

  // --- O SEU MÉTODO DE PDF DE QUESTIONÁRIO (CORRIGIDO) ---
  gerarPDF: async (req, res) => {
    console.log("A gerar relatório PDF de Questionários...");
    try {
      const { dataInicio, dataFim } = req.query;
      // DEPOIS: 'getRepository' movido para dentro
      const repository = AppDataSource.getRepository(Questionario);

      let whereClause = {};
      if (dataInicio && dataFim && dataInicio !== '' && dataFim !== '') {
        whereClause.createdAt = Between(new Date(dataInicio), new Date(dataFim));
      }

      const questionarios = await repository.find({ where: whereClause, order: { createdAt: 'DESC' } });

      if (questionarios.length === 0) {
            return res.status(404).json({ erro: "Nenhum questionário encontrado para este período." });
      }

      const doc = new PDFDocument({ margin: 40, layout: 'portrait', size: 'A4' });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=relatorio-questionarios.pdf');
      doc.pipe(res);

      doc.fontSize(16).font('Helvetica-Bold').text('Relatório de Questionários', { align: 'center' });
      doc.moveDown();

      // DEPOIS: Corrigida a lógica do loop para usar as colunas da sua Entidade
      questionarios.forEach((q, index) => {
            printTitle(doc, `Paciente: ${q.nome} (ID: ${q.id})`);
            printField(doc, 'Data de Envio', new Date(q.createdAt).toLocaleString('pt-BR'));
            printField(doc, 'Email', q.email);
            printField(doc, 'Telefone', q.telefone);
            printField(doc, 'Endereço', q.endereco);

            printTitle(doc, 'Motivação e Objetivos');
            printField(doc, '1. Motivação', q.motivo_consulta);
            printField(doc, '2. Fez tratamento prévio?', q.tratamento_previo);
            printField(doc, '3. Motivos da consulta', parseJsonField(q.motivos));
            printField(doc, '4. Áreas de interesse', parseJsonField(q.area_interesse));

            printTitle(doc, 'Histórico de Saúde');
            printField(doc, '5. Condições de saúde', q.historico_saude);
            printField(doc, '6. Tipo Sanguíneo', q.tipo_sanguineo);
            printField(doc, '7. Teve COVID-19?', q.teve_covid);
            printField(doc, '8. Vacinado(a) COVID-19?', q.vacina_covid);
            printField(doc, '9. Histórico familiar', parseJsonField(q.historico_doencas));

            printTitle(doc, 'Saúde e Bem-estar');
            printField(doc, '10. Retenção de líquidos?', q.retencao_liquidos);
            printField(doc, '11. Cansaço excessivo?', q.cansaco_excessivo);
            printField(doc, '12. Pratica atividade física?', q.pratica_fisica);

            printTitle(doc, 'Alimentação e Rotina');
            printField(doc, '13. Definição da alimentação', q.alimentacao);
            printField(doc, '14. Já seguiu dieta?', q.dieta);
            printField(doc, '15. Bebe líquidos nas refeições?', q.bebida);
            printField(doc, '16. Aversão alimentar', q.alimentacao_rotina);
            
            printTitle(doc, 'Saúde Feminina (Opcional)');
            printField(doc, '17. Idade da menarca', q.idade_menarca);
            printField(doc, '18. Ciclo regulado?', q.ciclo_menstrual);
            printField(doc, '19. Usa anticoncepcional?', q.contraceptivo);
            if (q.contraceptivo === 'sim') {
                printField(doc, '   Tipo', q.tipo_contraceptivo);
            }

            if (index < questionarios.length - 1) {
                doc.addPage();
            }
        });

      doc.end();

    } catch (err) {
      console.error('Erro ao gerar PDF de Questionário:', err);
      res.status(500).json({ erro: 'Falha ao gerar relatório.' });
    }
  },

  // DEPOIS: ESTA É A NOVA FUNÇÃO QUE GERA O PDF DE AGENDAMENTOS
  gerarPDFAgendamentos: async (req, res) => {
    console.log("A gerar relatório PDF de Agendamentos...");
    try {
        const { dataInicio, dataFim } = req.query; // Pega as datas do frontend
        // DEPOIS: 'getRepository' movido para dentro
        const repository = AppDataSource.getRepository(Agendamento);

        let whereClause = {};

        // Se o frontend enviou as datas, filtra por elas
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
};

module.exports = RelatorioController;