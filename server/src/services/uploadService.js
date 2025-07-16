const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const { uploadToMinio } = require('../utils/minio');

const mongoClient = new MongoClient(process.env.MONGO_URI);
const dbName = 'jobgenie';

async function handleResumeUpload(file, userId) {
  try {
    // 1. Upload to MinIO
    const fileStream = fs.createReadStream(file.path);
    const minioPath = `resumes/${userId}_${file.originalname}`;
    await uploadToMinio(minioPath, fileStream);

    // 2. Send to FastAPI using axios
    const form = new FormData();
    form.append('file', fs.createReadStream(file.path), file.originalname);

    const response = await axios.post('http://localhost:8000/parse', form, {
      headers: form.getHeaders(),
    });

    const { parsed_data, matches } = response.data;

    // 3. Save to MongoDB
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const resumes = db.collection('resumes');

    await resumes.insertOne({
      userId,
      filename: file.originalname,
      minioPath,
      parsedData: parsed_data || null,
      matches: matches || [],
      createdAt: new Date(),
    });

    return {
      message: 'Resume uploaded and parsed successfully.',
      parsed: parsed_data,
      matches,
    };
  } catch (err) {
    console.error('❌ UploadService error:', err.message);
    throw new Error('Resume processing failed');
  }
}

module.exports = { handleResumeUpload };
