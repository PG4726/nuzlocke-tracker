// gymdata.js — Base file for gym/boss guide data
// Must load before gymdata-gen*.js files
// Structure per boss:
// { name, title, badge, location, type, recommend: [], team: [{species, level, ability, held, moves:[]}] }

var GYM_DATA = {};

function getBosses(gameName) {
  return GYM_DATA[gameName] || [];
}
