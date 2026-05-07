const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define o caminho exato da pasta na raiz do projeto
const uploadFolder = path.resolve(process.cwd(), 'uploads');

// O "Superpoder": Se a pasta não existir no Railway, o Node cria ela na hora!
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        // Cria um nome único e seguro para a imagem
        const nomeUnico = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
        cb(null, nomeUnico);
    }
});

const upload = multer({ storage });

module.exports = upload;