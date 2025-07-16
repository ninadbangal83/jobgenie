const Minio = require('minio');
require('dotenv').config(); // Make sure env vars are loaded

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

async function uploadToMinio(objectName, fileStream) {
  const bucketName = process.env.MINIO_BUCKET_NAME || 'resumes';

  // Check if bucket exists; create if not
  const exists = await minioClient.bucketExists(bucketName).catch(() => false);
  if (!exists) await minioClient.makeBucket(bucketName);

  // Upload the file
  await minioClient.putObject(bucketName, objectName, fileStream);
}

module.exports = { uploadToMinio };
