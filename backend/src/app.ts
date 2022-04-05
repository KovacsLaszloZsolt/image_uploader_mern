import express, { Request } from 'express';
import morgan from 'morgan';
import multer, { StorageEngine } from 'multer';
import cors from 'cors';

export const app = express();

app.use(cors());

const fileStorageEngine: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './images');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('not suported type'));
  }
};
const upload = multer({ storage: fileStorageEngine, fileFilter: fileFilter }).single('image');

app.use(morgan('tiny'));
app.use('/images', express.static('images'));

app.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      const error = err as Error;
      if (error.message === 'not suported type') {
        res.status(401).json({ error: 'File not supported' });
        return;
      }

      res.status(500).json({ error: 'internal server error' });
    }
    const host = req.header('host') as string;
    const filePath = req.file?.path as string;
    res.status(200).json({ url: `http://${host}/${filePath}` });
  });
});
