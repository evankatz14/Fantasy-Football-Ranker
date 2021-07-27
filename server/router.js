const controller = require('./controllers');
const router = require('express').Router();

router.get('/rbs', controller.rbs.get);

router.put('/rbs', controller.rbs.updateRank)

module.exports = router;