import erreserbaRoutes from './src/routes/erreserbaRoutes.js';


const router = (app) => {
    app.use('/erreserba', erreserbaRoutes);

};

export default router;