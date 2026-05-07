/*
* Ficheiro: src/config/multer.js
* Documentação: Configuração de upload de arquivos. Guarda as imagens na pasta 'uploads'.
*/
const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); // Para gerar nomes únicos

module.exports = {
  // Destino e nome do ficheiro
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Aponta para a pasta 'uploads' na raiz do teu backend
      cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      // Cria um nome único (ex: 1234abcd-imagem.jpg) para evitar substituir fotos com o mesmo nome
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
};