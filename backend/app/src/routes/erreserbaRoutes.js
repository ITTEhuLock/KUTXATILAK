import express from 'express';
import * as eC from '../controllers/erreserbaController.js';
const router = express.Router();

router.get('/', eC.getErreserbak); // 3000/erreserba/
router.get('/:iderreserba', eC.getErreserba); // 3000/erreserba/1
router.get('/user/:idUser', eC.getErabiltzailearenErreserbak); // 3000/erreserba/user/1
router.get('/ezAmaituak/:idUser', eC.getErreserbaEzAmaituak); // 3000/erreserba/ezAmaituak/1
router.get('/amaituak/:idUser', eC.getErreserbaAmaituak); // 3000/erreserba/amaituak/1
router.get('/aktiboa/:idUser', eC.getErreserbaAktiboa); // 3000/erreserba/aktiboa/1
router.get('/kutxatila/:idKutxatila', eC.getKutxatilarenErreserbak); // 3000/erreserba/kutxatila/1
router.delete('/delete/', eC.deleteErreserba); // 3000/erreserba/delete/
router.put('/update/', eC.updateErreserba); //3000/erreserba/update/
router.post('/add', eC.createNewerreserba); // 3000/erreserba/add
router.post('/checkAvailability', eC.checkAvailability); // 3000/erreserba/checkAvailability


export default router;