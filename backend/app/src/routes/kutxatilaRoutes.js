import express from 'express';
import * as kC from '../controllers/kutxatilaController.js';
const router = express.Router();

router.get('/', kC.getKutxatilak); // 3000/kutxatila/
router.get('/:idKutxatila', kC.getKutxatila); // 3000/kutxatila/1
router.delete('/delete/', kC.deleteKutxatila); // 3000/kutxatila/delete/
router.put('/updateEgoera/',kC.updateKutxatilaEgoera);
router.put('/updateKodea/',kC.updateKutxatilaKodea); 
router.put('/updateKokapena/',kC.updateKutxatilaKokapena); 
router.put('/updateTarteak/',kC.updateKutxatilaErabileraTartea); 
router.post('/add', kC.createNewKutxatila); // 3000/kutxatila/add



export default router;