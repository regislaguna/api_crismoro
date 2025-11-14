const { uploadImageToGCS } = require('../app/services/gcsUpload');

class UploadController {
  async store(req, res) {
    try {
      const myFile = req.file;
      if (!myFile) {
        return res.status(400).json({ erro: 'Ficheiro não enviado.' });
      }

      const publicUrl = await uploadImageToGCS(myFile);

      return res.status(200).json({
        message: "Upload bem-sucedido!",
        url: publicUrl
      });

    } catch (err) {
      console.error("Erro no upload:", err);
      return res.status(500).json({ erro: "Falha no upload do ficheiro." });
    }
  }
}

module.exports = new UploadController();
