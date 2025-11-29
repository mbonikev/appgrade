import multer from 'multer';
import path from 'path';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter to accept only images
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

// Multer upload configuration
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit per file
    },
    fileFilter: fileFilter,
});

// Field configurations for different upload scenarios
export const uploadFields = upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 },
]);
