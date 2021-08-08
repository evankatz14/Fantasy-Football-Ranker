const { db } = require('../postgres');

module.exports = {
  getTop200: async () => {
    try {
      return await db.any('SELECT * FROM all_players WHERE NOT position = $1 ORDER BY overall_rank LIMIT 200', ['K']);
    } catch (err) {
      return err;
    }
  },
  updateOverallRanks: (top200) => {
    try {
      return top200.map(async (player) => {
        return await db.none('Update all_players SET overall_rank = $1 WHERE id = $2', [player.overall_rank, player.id])
      })
    } catch (err) {
      return err;
    }
  }
}