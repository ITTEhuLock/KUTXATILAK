import express from 'express';
import * as uC from '../controllers/userController.js';
const router = express.Router();

router.get('/', uC.getUsers); // 3000/user/
router.get('/:idUser', uC.getUser); // 3000/user/1
router.get('/role/:idUser', uC.getRole);
router.delete('/delete/:idUser', uC.deleteUser); // 3000/user/delete/
router.put('/update/', uC.updateUser); //3000/user/update/
router.post('/add', uC.createNewUser); // 3000/user/add
router.put('/changePassword', uC.changePassword); // 3000/user/changePassword
router.put('/changeEgoera', uC.changeEgoera); // 3000/user/changeEgoera
router.post('/verifyUser', uC.verifyUser); // 3000/user/verify
router.post('/checkUser', uC.checkUser); 

export default router;