const models = require('../models');

module.exports = {
  getQbs: async (req, res) => {
    try {
      const results = await models.qbs.getQbs();
      res.json(results);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  },
  updateQbRanks: async (req, res) => {
    try {
      await models.qbs.updateQbRanks();
      res.sendStatus(200);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  }
}