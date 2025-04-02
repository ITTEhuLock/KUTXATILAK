import erreserbaRoutes from './src/routes/erreserbaRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import kutxatilaRoutes from './src/routes/kutxatilaRoutes.js';
import raspberryRoutes from './src/routes/raspberryRoutes.js';
import pausoaRoutes from './src/routes/pausoaRoutes.js';
import gelaRoutes from './src/routes/gelaRoutes.js';
import ibilibideaRoutes from './src/routes/ibilibideaRoutes.js';
import oztopoaRoutes from './src/routes/oztopoaRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';

const router = (app) => {
    app.use('/erreserba', erreserbaRoutes);
    app.use('/user', userRoutes);
    app.use('/kutxatila', kutxatilaRoutes);
    app.use('/raspberry', raspberryRoutes);
    app.use('/pausoa', pausoaRoutes);
    app.use('/gela', gelaRoutes);
    app.use('/ibilbidea', ibilibideaRoutes);
    app.use('/oztopoa', oztopoaRoutes);
    app.use('/', adminRoutes);
    


};

export default router;