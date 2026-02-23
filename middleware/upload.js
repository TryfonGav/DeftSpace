const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'deftspace/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, crop: 'limit' }]
  }
});

// Cloudinary storage for audio
const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'deftspace/audio',
    resource_type: 'video',
    allowed_formats: ['mp3', 'wav', 'ogg', 'm4a']
  }
});

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const audioFilter = (req, file, cb) => {
  const allowedExt = /mp3|wav|ogg|m4a/;
  const allowedMime = /audio\/(mpeg|mp3|wav|ogg|x-m4a|mp4|x-wav)/;
  const ext = allowedExt.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedMime.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only audio files (MP3, WAV, OGG, M4A) are allowed'));
};

const uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter, limits: { fileSize: 10 * 1024 * 1024 } });
const uploadAudio = multer({ storage: audioStorage, fileFilter: audioFilter, limits: { fileSize: 50 * 1024 * 1024 } });

module.exports = { uploadImage, uploadAudio, cloudinary };
