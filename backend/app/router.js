import erreserbaRoutes from './src/routes/erreserbaRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

const router = (app) => {
    app.use('/erreserba', erreserbaRoutes);
    app.use('/user', userRoutes);


};

export default router;