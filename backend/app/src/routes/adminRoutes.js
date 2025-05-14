import express from 'express';
import path from 'path';

const isPkg = typeof process.pkg !== 'undefined';
const basePath = isPkg
    ? path.dirname(process.execPath)
    : path.resolve();


    const router = express.Router();


router.use('/pics', express.static(path.join(basePath, 'app', 'src', 'views', 'pics')));
router.use('/', express.static(path.join(basePath, 'app', 'src', 'views', 'html')));
router.use('/css', express.static(path.join(basePath, 'app', 'src', 'views', 'css')));
router.use('/js', express.static(path.join(basePath, 'app', 'src', 'views', 'js')));
router.use('/pwa', express.static(path.join(basePath, 'app', 'pwa')));
router.use('/downloads', express.static(path.join(basePath, 'app', 'src', 'downloads')));
export default router;
