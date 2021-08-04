const pgp = require('pg-promise')();
const db = pgp('postgres://evankatz@localhost:5432/fantasy')
const axios = require('axios');

// axios.get('https://fly.sportsdata.io/v3/nfl/scores/json/Players', {
//   headers: {
//     'Ocp-Apim-Subscription-Key': '4b14ebc90b0f4e37a78060db7ade4748',
//   }
// })
//   .then(({data}) => {
//     const acceptedPositions = ['RB', 'WR', 'QB', 'TE', 'K']
//     const test = data.filter(player => acceptedPositions.includes(player.Position) && player.Active === true);
//     const playerPromises = data.filter(player => player.Active === true && acceptedPositions.includes(player.Position)).map( async (player) => {
//       try {
//         await db.one('INSERT INTO all_players (team, name, position, active, age, photo_url, bye_week, adp, position_rank, overall_rank) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', [player.Team, player.Name, player.FantasyPosition, player.Active, player.Age, player.PhotoUrl, player.ByeWeek, player.AverageDraftPosition, player.AverageDraftPosition, player.AverageDraftPosition]);
//       } catch(err) {
//         console.log('failed to upload player', err);
//       }
//     });
//     Promise.all(playerPromises).then(() => {
//       console.log('successfully stored all players');
//     })
//   })

module.exports = {pgp, db}