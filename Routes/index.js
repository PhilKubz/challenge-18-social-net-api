const router = require('express').Router();
const { userRoutes, thoughtRoutes } = require('./api/index');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
