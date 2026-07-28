import multer from 'multer';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';

const storage = multer.memoryStorage();

const fileFilter = (
  _req: AuthRequest,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(file.mimetype);
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp, svg) are allowed'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string = 'soyirilabs'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        if (result) resolve(result.secure_url);
        reject(new Error('Upload failed'));
      }
    );

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

export const uploadSingle = (fieldName: string) => (req: AuthRequest, res: Response, next: NextFunction) => {
  const single = upload.single(fieldName);
  single(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }
    if (err) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }
    next();
  });
};

export const uploadMultiple = (fieldName: string, maxCount: number = 10) => (req: AuthRequest, res: Response, next: NextFunction) => {
  const array = upload.array(fieldName, maxCount);
  array(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }
    if (err) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }
    next();
  });
};

export default upload;
