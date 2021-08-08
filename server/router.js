const controller = require('./controllers');
const router = require('express').Router();

router.get('/all', controller.all.getTop200);

router.get('/rbs', controller.rbs.getRbs);
router.get('/wrs', controller.wrs.getWrs);
router.get('/qbs', controller.qbs.getQbs);
router.get('/tes', controller.tes.getTes);

router.put('/all', controller.all.updateOverallRanks);

router.put('/rbs', controller.rbs.updateRbRanks);
router.put('/wrs', controller.wrs.updateWrRanks);
router.put('/qbs', controller.qbs.updateQbRanks);
router.put('/tes', controller.tes.updateTeRanks);

module.exports = router;