import * as gC from '../controllers/gelaController.js';
import express from 'express';
const router = express.Router();

router.get('/', gC.getGelak);
router.get('/:idGela', gC.getGela);
router.get('/lortu/koordenatuak', gC.getKoordenatuak);

export default router;