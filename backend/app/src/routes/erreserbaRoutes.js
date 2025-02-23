import express from 'express';
import * as eC from '../controllers/erreserbaController.js';
const router = express.Router();

router.get('/', eC.getErreserbas); // 3000/erreserba/
router.get('/:iderreserba', eC.getErreserba); // 3000/erreserba/1
router.delete('/delete/', eC.deleteErreserba); // 3000/erreserba/delete/
router.put('/update/', eC.updateErreserba); //3000/erreserba/update/
router.post('/add', eC.createNewerreserba); // 3000/erreserba/add


export default router;