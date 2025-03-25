import express from 'express';
import path from 'path';

const isPkg = typeof process.pkg !== 'undefined';
const basePath = isPkg
    ? path.dirname(process.execPath)
    : path.resolve();


    const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(basePath, 'app', 'src', 'views', 'html', 'index.html'));
});
router.get('/admin', (req, res) => {
    res.sendFile(path.join(basePath, 'app', 'src', 'views', 'html', 'administraria.html'));
});
router.use('/css', express.static(path.join(basePath, 'app', 'src', 'views', 'css')));
router.use('/js', express.static(path.join(basePath, 'app', 'src', 'views', 'js')));

export default router;
