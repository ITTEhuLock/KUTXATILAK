import * as gC from '../controllers/gelaController.js';
import express from 'express';
const router = express.Router();

router.get('/', gC.getGelak);
router.get('/:idGela', gC.getGela);
router.get('/lortu/koordenatuak', gC.getKoordenatuak);
router.get('/lortu/mapa', gC.getWalkableSpots);
router.post('/add', gC.createNewGela);
export default router;