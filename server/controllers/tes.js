const models = require('../models');

module.exports = {
  getTes: async (req, res) => {
    try {
      const results = await models.tes.getTes();
      res.json(results);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  },
  updateTeRanks: async (req, res) => {
    try {
      await models.tes.updateTeRanks(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  }
}