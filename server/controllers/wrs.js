const models = require('../models');

module.exports = {
  getWrs: async (req, res) => {
    try {
      const result = await models.wrs.getWrs();
      res.json(result);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  },
  updateWrRanks: async (req, res) => {
    try {
      const result = await models.wrs.updateWrRanks(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  }
}