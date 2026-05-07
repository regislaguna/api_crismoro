/*
* Ficheiro: src/controller/RelatorioController.js
*/
const PDFDocument = require('pdfkit');
const AppDataSource = require('../database/database');
const RespostaQuestionario = require('../app/Entities/RespostaQuestionario');

class RelatorioController {
  
  // ==========================================
  // RELATÓRIO DE QUESTIONÁRIOS (ATUALIZADO)
  // ==========================================
  async gerarQuestionarios(req, res) {
    try {
      const repository = AppDataSource.getRepository(RespostaQuestionario);
      let questionarios = await repository.find();

      // --- NOVO FILTRO PARA RELATÓRIO INDIVIDUAL ---
      // Capturamos o nome que o React enviou na URL
      const { nome } = req.query; 

      // Se o React enviou um nome, filtramos a lista antes de desenhar o PDF
      if (nome) {
        questionarios = questionarios.filter(q => 
          q.nome && q.nome.toLowerCase().includes(nome.toLowerCase())
        );
      }
      // ---------------------------------------------

      const doc = new PDFDocument({ margin: 50 });
      res.setHeader('Content-Type', 'application/pdf');
      
      // Muda o nome do ficheiro se for individual
      const nomeArquivo = nome ? `dossie-${nome}.pdf` : 'relatorio-completo-questionarios.pdf';
      res.setHeader('Content-Disposition', `attachment; filename=${nomeArquivo}`);
      
      doc.pipe(res);

      doc.fontSize(18).font('Helvetica-Bold').text('Relatório Clínico de Questionários', { align: 'center' });
      
      if (nome) {
        doc.fontSize(12).font('Helvetica').text(`Filtro aplicado: Paciente "${nome}"`, { align: 'center' });
      }
      doc.moveDown(2);

      const formatarArray = (valor) => {
        if (!valor || valor === '[]' || valor === '""') return 'Não informado';
        try {
          const parseado = JSON.parse(valor);
          if (Array.isArray(parseado)) return parseado.join(', ');
          return parseado;
        } catch (e) {
          return String(valor).replace(/["\[\]]/g, ''); 
        }
      };

      if (questionarios.length === 0) {
        doc.fontSize(12).font('Helvetica').text('Nenhum paciente encontrado com esse nome.', { align: 'center' });
      } else {
        // Laço para desenhar CADA questionário (Igual ao que já tínhamos)
        questionarios.forEach((q, index) => {
          doc.fontSize(14).font('Helvetica-Bold').text(`Ficha #${index + 1} - Paciente: ${q.nome || 'Sem Nome'}`);
          doc.moveDown(0.5);

          const dataCriacao = q.createdAt ? new Date(q.createdAt).toLocaleDateString('pt-BR') : 'Não registrada';
          doc.fontSize(10);
          
          doc.font('Helvetica-Bold').text('1. Dados Pessoais');
          doc.font('Helvetica');
          doc.text(`Data do Preenchimento: ${dataCriacao}`);
          doc.text(`Email: ${q.email || 'N/A'}   |   Telefone: ${q.telefone || 'N/A'}`);
          doc.text(`Endereço: ${q.endereco || 'N/A'}`);
          doc.moveDown(0.5);

          doc.font('Helvetica-Bold').text('2. Motivação e Objetivos');
          doc.font('Helvetica');
          doc.text(`Motivo da Consulta: ${q.motivo_consulta || 'N/A'}`);
          doc.text(`Tratamento Prévio: ${q.tratamento_previo || 'N/A'}`);
          doc.text(`Motivos Estéticos: ${formatarArray(q.motivos)}`);
          doc.text(`Áreas de Interesse: ${formatarArray(q.area_interesse)}`);
          doc.moveDown(0.5);

          doc.font('Helvetica-Bold').text('3. Saúde Geral');
          doc.font('Helvetica');
          doc.text(`Condições/Doenças: ${q.historico_saude || 'N/A'}`);
          doc.text(`Tipo Sanguíneo: ${q.tipo_sanguineo || 'N/A'}   |   Teve COVID: ${q.teve_covid || 'N/A'}   |   Vacina COVID: ${q.vacina_covid || 'N/A'}`);
          doc.text(`Histórico Familiar de Doenças: ${formatarArray(q.historico_doencas)}`);
          doc.moveDown(0.5);

          doc.font('Helvetica-Bold').text('4. Saúde e Bem-estar');
          doc.font('Helvetica');
          doc.text(`Retenção de Líquidos: ${q.retencao_liquidos || 'N/A'}   |   Cansaço Excessivo: ${q.cansaco_excessivo || 'N/A'}`);
          doc.text(`Prática de Atividades Físicas: ${q.pratica_fisica || 'N/A'}`);
          doc.moveDown(0.5);

          doc.font('Helvetica-Bold').text('5. Alimentação');
          doc.font('Helvetica');
          doc.text(`Definição da Alimentação: ${q.alimentacao || 'N/A'}   |   Já seguiu dieta: ${q.dieta || 'N/A'}`);
          doc.text(`Bebe líquidos nas refeições: ${q.bebida || 'N/A'}`);
          doc.text(`Aversões Alimentares: ${q.alimentacao_rotina || 'N/A'}`);
          doc.moveDown(0.5);

          doc.font('Helvetica-Bold').text('6. Saúde Feminina');
          doc.font('Helvetica');
          doc.text(`Idade Menarca: ${q.idade_menarca || 'N/A'}   |   Ciclo Regulado: ${q.ciclo_menstrual || 'N/A'}`);
          doc.text(`Usa Anticoncepcional: ${q.contraceptivo || 'N/A'}   |   Tipo: ${q.tipo_contraceptivo || 'N/A'}`);

          doc.moveDown(1);
          doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#cccccc').stroke();
          doc.moveDown(1.5);
          doc.fillColor('black'); 
        });
      }

      doc.end();

    } catch (error) {
      console.error("Erro ao gerar relatório completo de questionários:", error);
      return res.status(500).json({ erro: 'Falha interna ao gerar o PDF completo.' });
    }
  }

  // ==========================================
  // RELATÓRIO DE AGENDAMENTOS
  // ==========================================
  async gerarAgendamentos(req, res) {
      try {
        const doc = new PDFDocument({ margin: 50 });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio-agendamentos.pdf');
        doc.pipe(res);
        doc.fontSize(18).text('Relatório de Agendamentos', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text('Esta rota precisa ser ligada ao repositório de Agendamentos, similar aos Questionários.', { align: 'center' });
        doc.end();
      } catch (error) {
        return res.status(500).json({ erro: 'Erro no PDF' });
      }
  }
}

module.exports = new RelatorioController();

