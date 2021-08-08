const { db } = require('../postgres');

module.exports = {
  getQbs: async () => {
    try {
      return await db.any('SELECT * FROM all_players WHERE position = $1 ORDER BY position_rank LIMIT 50', ['QB']);
    } catch (err) {
      return err;
    }
  },
  updateQbRanks: (qbs) => {
    try {
      return qbs.map(async (qb) => {
        return await db.none('UPDATE all_players SET position_rank = $1 WHERE id = $2', [qb.position_rank, qb.id]);
      })
    } catch (err) {
      return err;
    }
  }
}