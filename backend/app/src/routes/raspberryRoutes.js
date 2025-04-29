import express from 'express';
import * as rC from '../controllers/raspberry.js';
const router = express.Router();

router.post('/check', rC.checkErreserba); 
router.post('/hasi', rC.hasiErreserba);
router.post('/amaitu', rC.amaituErreserba);


export default router;