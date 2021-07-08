const controller = require('./controllers');
const router = require('express').Router();

router.get('/rbs', controller.rbs.get);

module.exports = router;