import express from 'express';
import * as oztopoaController from '../controllers/oztopoaController.js';

const router = express.Router();

router.get('/', oztopoaController.getOztopoak);
router.get('/:idIOztopoa', oztopoaController.getOztopoa);
router.get('/oztopoakSolairuka/:solairua/:eraikina', oztopoaController.getOztopoakSolairuka);


export default router;