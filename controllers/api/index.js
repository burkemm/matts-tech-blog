const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
// These are the routes I'll be using.
router.use('/users', userRoutes);
router.use('/posts', postRoutes);


module.exports = router;
