const models = require('../models');

module.exports = {
  getTop200: async (req, res) => {
    try {
      const results = await models.all.getTop200();
      res.json(results);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  }
}