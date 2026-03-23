import express from 'express';
import * as controller from '../controllers/fotoController.js'

const router = express.Router();

router.post('/:id/foto', upload.single('foto'), controller.uploadFoto);
router.get(':id/aluno', controller.verFoto);
