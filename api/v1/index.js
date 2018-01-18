const router = require('express').Router();

router.use('/products', require('./products'));

module.exports = router;