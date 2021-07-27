var models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const results = await models.rbs.getAllRbs();
      res.json(results);
    } catch (err) {
      res.send(err);
    }
  },
  updateRank: async (req, res) => {
    try {
      await models.rbs.updateRbRanks(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(500);
      res.send(err);
    }
  }
}