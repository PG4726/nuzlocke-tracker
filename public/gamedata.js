// gamedata.js — Base file
// IMPORTANT: Must use `var` not `const` so gen files can reference it cross-script.
// Load order in index.html must be:
//   gamedata.js → gamedata-gen1.js → ... → app.js

var GAME_DATA = {};

function getAllGames()              { return Object.keys(GAME_DATA).sort(); }
function getRoutes(gameName)        { return GAME_DATA[gameName]?.routes || []; }
function getEncounters(g, r)        { return getRoutes(g).find(x => x.name === r)?.encounters || []; }
function getRouteLevels(g, r)       { return getRoutes(g).find(x => x.name === r)?.levels || null; }
function getBadgeCount(gameName)    { return GAME_DATA[gameName]?.badgeCount || 8; }