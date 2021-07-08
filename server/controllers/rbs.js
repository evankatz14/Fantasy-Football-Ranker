var models = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const results = await models.rbs.getAllRbs();
      res.json(results);
    } catch (err) {
      res.send(err);
    }
  }
}