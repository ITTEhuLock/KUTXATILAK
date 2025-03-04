import erreserbaRoutes from './src/routes/erreserbaRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import kutxatilaRoutes from './src/routes/kutxatilaRoutes.js';

const router = (app) => {
    app.use('/erreserba', erreserbaRoutes);
    app.use('/user', userRoutes);
    app.use('/kutxatila', kutxatilaRoutes);


};

export default router;