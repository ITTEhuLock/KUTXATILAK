import express from 'express';
import * as eC from '../controllers/userController.js';
const router = express.Router();

router.get('/', eC.getUsers); // 3000/user/
router.get('/:idUser', eC.getUser); // 3000/user/1
router.delete('/delete/', eC.deleteUser); // 3000/user/delete/
router.put('/update/', eC.updateUser); //3000/user/update/
router.post('/add', eC.createNewUser); // 3000/user/add
router.post('/veryfy', eC.verifyUser); // 3000/user/verify


export default router;