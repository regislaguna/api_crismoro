const { Storage } = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.resolve(process.env.GCS_KEY_PATH || './gcs-key.json');

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GCS_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

const uploadImageToGCS = (file) => new Promise((resolve, reject) => {
  if (!file) return reject('Nenhum ficheiro para upload.');

  const gcsFileName = `${Date.now()}-${file.originalname}`;
  const blob = bucket.file(gcsFileName);

  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
  });

  blobStream.on('error', reject);

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    resolve(publicUrl);
  });

  blobStream.end(file.buffer);
});

module.exports = { uploadImageToGCS };
