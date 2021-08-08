const { db } = require('../postgres');

module.exports = {
  getTop200: async () => {
    try {
      return await db.any('SELECT * FROM all_players ORDER BY overall_rank LIMIT 200');
    } catch (err) {
      return err;
    }
  }
}