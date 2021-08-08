const { db } = require('../postgres');

module.exports = {
  getTes: async () => {
    try {
      return await db.any('SELECT * FROM all_players WHERE position = $1 ORDER BY position_rank LIMIT 40', ['TE']);
    } catch (err) {
      return err;
    }
  },
  updateTeRanks: async (tes) => {
    try {
      return tes.map(async (te) => {
        return await db.none('UPDATE all_players SET position_rank = $1 WHERE id = $2', [te.position_rank, te.id])
      })
    } catch (err) {
      return err;
    }
  }
}