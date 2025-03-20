import erreserbaRoutes from './src/routes/erreserbaRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import kutxatilaRoutes from './src/routes/kutxatilaRoutes.js';
import raspberryRoutes from './src/routes/raspberryRoutes.js';

const router = (app) => {
    app.use('/erreserba', erreserbaRoutes);
    app.use('/user', userRoutes);
    app.use('/kutxatila', kutxatilaRoutes);
    app.use('/raspberry', raspberryRoutes);
    


};

export default router;