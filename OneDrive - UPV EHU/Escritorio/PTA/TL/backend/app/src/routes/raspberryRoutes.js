import express from 'express';
import * as rC from '../controllers/raspberry.js';
const router = express.Router();

router.post('/check', rC.checkErreserba); 


export default router;