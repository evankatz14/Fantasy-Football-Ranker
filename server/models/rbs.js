const { db } = require('../postgres');

module.exports = {
  getAllRbs: async () => {
    try {
      return await db.any('SELECT * FROM rbs ORDER BY adp');
    } catch (err) {
      return err;
    }
  }
}