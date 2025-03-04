import express from 'express';
import * as eC from '../controllers/kutxatilaController.js';
const router = express.Router();

router.get('/', eC.getKutxatilak); // 3000/kutxatila/
router.get('/:idKutxatila', eC.getKutxatila); // 3000/kutxatila/1
router.delete('/delete/', eC.deleteKutxatila); // 3000/kutxatila/delete/
router.put('/update/', eC.updateKutxatila); //3000/kutxatila/update/
router.post('/add', eC.createNewKutxatila); // 3000/kutxatila/add



export default router;