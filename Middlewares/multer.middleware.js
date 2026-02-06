// middlewares/upload.middleware.js
// const multer = require('multer');

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 10 * 1024 * 1024 }
// });

// module.exports = upload;

// middlewares/upload.middleware.js
const multer = require('multer');
const path = require('path');
const os = require('os');

// Senior Tip: Using the OS temp directory is safer for deployments (Heroku, Docker, etc.)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, os.tmpdir()); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        // Basic security: check file types
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images and videos are allowed!'), false);
        }
    }
});

module.exports = upload;
