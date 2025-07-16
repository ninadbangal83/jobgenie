const { handleResumeUpload } = require('../services/uploadService');

const uploadResume = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user.id;

    const result = await handleResumeUpload(file, userId);
    res.status(200).json(result);
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ message: 'Resume upload failed', error: err.message });
  }
};

module.exports = { uploadResume };
