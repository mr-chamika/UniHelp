import Router from 'express';
import multer from 'multer';

const router = new Router();

const upload = multer({ dest: 'uploads/' });

import { uploadContent, createContent, getContent, getContentI, deleteContent, insertContent } from '../Controllers/storageController.js';

router.post('/create', createContent);
router.delete('/:id', deleteContent);
router.put('/', insertContent);
router.post('/upload', upload.single('file'), uploadContent);
router.get('/:id/:uid', getContentI);
router.get('/:uid', getContent);

export default router;
