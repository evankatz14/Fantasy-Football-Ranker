const models = require('../models');

module.exports = {
  getTop200: async (req, res) => {
    try {
      const results = await models.all.getTop200();
      const resultsWithDiff = results.map(player => {
        const diff = player.yahoo_rank - player.overall_rank;
        return {...player, diff}
      })
      res.json(resultsWithDiff);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  },
  updateOverallRanks: async (req, res) => {
    try {
      await models.all.updateOverallRanks(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  }
}