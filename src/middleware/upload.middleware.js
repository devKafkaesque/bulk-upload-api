import multer from 'multer';

// Setup the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory for storing files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Define the file name
  }
});

const upload = multer({ storage: storage });

export const fileUpload = upload.single('file');
