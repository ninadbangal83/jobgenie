const express = require('express');
const multer = require('multer');
const { uploadResume } = require('../controllers/uploadContoller'); // ✅ Match file name
const verifyToken  = require('../middlewares/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', verifyToken, upload.single('resume'), uploadResume);

module.exports = router;
