const controller = require('./controllers');
const router = require('express').Router();

router.get('/rbs', controller.rbs.getRbs);
router.get('/wrs', controller.wrs.getWrs);
router.get('/qbs', controller.qbs.getQbs);

router.put('/rbs', controller.rbs.updateRbRanks);
router.put('/wrs', controller.wrs.updateWrRanks);
router.put('/qbs', controller.qbs.updateQbRanks);

module.exports = router;