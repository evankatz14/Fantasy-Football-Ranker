const { db } = require('../postgres');

module.exports = {
  getWrs: async () => {
    try {
      return await db.any('SELECT * FROM all_players WHERE position = $1 ORDER BY position_rank LIMIT 100', ['WR']);
    } catch (err) {
      return err;
    }
  },
  updateWrRanks: async (wrs) => {
    try {
      return wrs.map(async (wr) => {
        return await db.none('UPDATE all_players SET position_rank = $1 WHERE id = $2', [wr.position_rank, wr.id])
      })
    } catch (err) {
      return err;
    }
  }
}