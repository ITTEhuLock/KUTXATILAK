import express from 'express';
import * as pC from '../controllers/pausoaController.js';
const router = express.Router();

router.get('/bideraketak/', pC.getBideraketa); 

export default router;