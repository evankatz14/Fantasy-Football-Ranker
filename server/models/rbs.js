const { db } = require('../postgres');

module.exports = {
  getAllRbs: async () => {
    try {
      return await db.any('SELECT * FROM rbs ORDER BY rank LIMIT 100');
    } catch (err) {
      return err;
    }
  },
  updateRbRanks: async (rbs) => {
    try {
      return rbs.map(async (rb) => {
        return await db.none('UPDATE rbs SET rank = $1 WHERE id = $2', [rb.rank, rb.id]);
      })
    } catch (err) {
      return err;
    }
  }
}