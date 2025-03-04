import express from 'express';
import * as uC from '../controllers/userController.js';
const router = express.Router();

router.get('/', uC.getUsers); // 3000/user/
router.get('/:idUser', uC.getUser); // 3000/user/1
router.delete('/delete/', uC.deleteUser); // 3000/user/delete/
router.put('/update/', uC.updateUser); //3000/user/update/
router.post('/add', uC.createNewUser); // 3000/user/add
router.post('/veryfy', uC.verifyUser); // 3000/user/verify


export default router;