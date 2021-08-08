const { db } = require('../postgres');

module.exports = {
  getRbs: async () => {
    try {
      return await db.any('SELECT * FROM all_players WHERE position = $1 ORDER BY position_rank LIMIT 75', ['RB']);
    } catch (err) {
      return err;
    }
  },
  updateRbRanks: (rbs) => {
    try {
      return rbs.map(async (rb) => {
        return await db.none('UPDATE all_players SET position_rank = $1 WHERE id = $2', [rb.position_rank, rb.id]);
      })
    } catch (err) {
      return err;
    }
  }
}