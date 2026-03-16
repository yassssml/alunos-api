import express from 'express';
import * as controller from '../controllers/alunosController.js';

const router = express.Router();

router.get('/pdf', controller.relatorioTodos);
router.get('/pdf:id', controller.buscarPorId);

export default router;
