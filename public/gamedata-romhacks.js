// gamedata-romhacks.js — Drayano ROM Hack encounter data
// All Drayano hacks use the same routes as their base games,
// but with expanded encounter tables (more Pokémon per route).
// Radical Red is also included here (Kanto-based).
//
// Drayano design philosophy: every route has 3+ Pokémon available,
// version exclusives are shared, and rare Pokémon appear earlier.

Object.assign(GAME_DATA, {

  // ══════════════════════════════════════════════════════════════
  //  STORM SILVER / SACRED GOLD (Johto — HGSS base)
  //  By Drayano. All routes expanded, Pokémon available much earlier.
  // ══════════════════════════════════════════════════════════════

  "Storm Silver": {
    badgeCount: 16,
    routes: [
      // ── JOHTO ──
      { name: "Route 29",          encounters: ["Pidgey", "Rattata", "Sentret", "Hoothoot", "Poochyena", "Zigzagoon"] },
      { name: "Route 30",          encounters: ["Pidgey", "Rattata", "Caterpie", "Weedle", "Poliwag", "Ledyba", "Spinarak", "Hoothoot"] },
      { name: "Route 31",          encounters: ["Pidgey", "Bellsprout", "Caterpie", "Weedle", "Poliwag", "Ledyba", "Spinarak"] },
      { name: "Route 32",          encounters: ["Rattata", "Ekans", "Bellsprout", "Mareep", "Hoppip", "Wooper", "Qwilfish", "Tentacool"] },
      { name: "Route 33",          encounters: ["Rattata", "Ekans", "Spearow", "Hoppip", "Primeape", "Mankey"] },
      { name: "Route 34",          encounters: ["Drowzee", "Jigglypuff", "Abra", "Rattata", "Persian", "Meowth"] },
      { name: "Route 35",          encounters: ["Nidoran♀", "Nidoran♂", "Pidgey", "Yanma", "Girafarig", "Growlithe", "Vulpix"] },
      { name: "Route 36",          encounters: ["Nidoran♀", "Nidoran♂", "Pidgey", "Stantler", "Growlithe", "Vulpix", "Tauros", "Miltank"] },
      { name: "Route 37",          encounters: ["Nidoran♀", "Nidoran♂", "Pidgey", "Stantler", "Growlithe", "Vulpix"] },
      { name: "Route 38",          encounters: ["Raticate", "Snubbull", "Growlithe", "Vulpix", "Tauros", "Miltank", "Magnemite"] },
      { name: "Route 39",          encounters: ["Raticate", "Snubbull", "Growlithe", "Vulpix", "Tauros", "Miltank"] },
      { name: "Route 40",          encounters: ["Tentacool", "Tentacruel", "Magikarp", "Krabby", "Corsola", "Staryu"] },
      { name: "Route 41",          encounters: ["Tentacool", "Tentacruel", "Mantine", "Magikarp", "Chinchou", "Lanturn"] },
      { name: "Route 42",          encounters: ["Spearow", "Ekans", "Marill", "Magikarp", "Goldeen", "Slugma"] },
      { name: "Route 43",          encounters: ["Girafarig", "Rattata", "Sentret", "Flaaffy", "Magikarp", "Furret"] },
      { name: "Route 44",          encounters: ["Lickitung", "Poliwhirl", "Weepinbell", "Tangela", "Togetic"] },
      { name: "Route 45",          encounters: ["Graveler", "Geodude", "Gligar", "Skarmory", "Phanpy", "Teddiursa", "Dratini"] },
      { name: "Route 46",          encounters: ["Geodude", "Rattata", "Spearow", "Phanpy", "Teddiursa"] },
      { name: "Sprout Tower",      encounters: ["Rattata", "Gastly", "Bellsprout"] },
      { name: "Union Cave",        encounters: ["Zubat", "Geodude", "Onix", "Rattata", "Sandshrew", "Lapras", "Wooper", "Omanyte", "Kabuto"] },
      { name: "Slowpoke Well",     encounters: ["Zubat", "Slowpoke", "Shellder", "Psyduck"] },
      { name: "Ilex Forest",       encounters: ["Caterpie", "Weedle", "Oddish", "Psyduck", "Poliwag", "Scyther", "Pinsir", "Paras"] },
      { name: "National Park",     encounters: ["Caterpie", "Weedle", "Sunkern", "Scyther", "Pinsir", "Eevee"] },
      { name: "Burned Tower",      encounters: ["Koffing", "Raticate", "Magmar", "Zubat", "Slugma", "Houndour", "Growlithe"] },
      { name: "Olivine Lighthouse", encounters: ["Gastly", "Magnemite"] },
      { name: "Whirl Islands",     encounters: ["Zubat", "Golbat", "Seel", "Dewgong", "Lugia"] },
      { name: "Mt. Mortar",        encounters: ["Rattata", "Zubat", "Geodude", "Machop", "Machoke", "Marill", "Primeape"] },
      { name: "Lake of Rage",      encounters: ["Gyarados", "Magikarp", "Dratini"] },
      { name: "Team Rocket HQ",    encounters: ["Rattata", "Koffing", "Grimer", "Voltorb"] },
      { name: "Ice Path",          encounters: ["Zubat", "Golbat", "Jynx", "Swinub", "Delibird", "Sneasel"] },
      { name: "Dragon's Den",      encounters: ["Magikarp", "Dratini", "Dragonair"] },
      { name: "Dark Cave",         encounters: ["Zubat", "Geodude", "Wobbuffet", "Dunsparce", "Teddiursa", "Phanpy"] },
      // ── KANTO ──
      { name: "Route 1 (Kanto)",   encounters: ["Pidgey", "Rattata", "Sentret", "Hoothoot"] },
      { name: "Route 2 (Kanto)",   encounters: ["Pidgey", "Rattata", "Caterpie", "Weedle", "Exeggcute", "Butterfree", "Beedrill"] },
      { name: "Route 3 (Kanto)",   encounters: ["Pidgey", "Rattata", "Jigglypuff", "Spearow", "Mankey"] },
      { name: "Route 4 (Kanto)",   encounters: ["Rattata", "Spearow", "Ekans", "Arbok", "Sandshrew", "Sandslash"] },
      { name: "Route 6 (Kanto)",   encounters: ["Pidgey", "Rattata", "Oddish", "Meowth", "Drowzee", "Abra"] },
      { name: "Route 7 (Kanto)",   encounters: ["Pidgey", "Rattata", "Growlithe", "Vulpix", "Eevee"] },
      { name: "Route 8 (Kanto)",   encounters: ["Pidgey", "Growlithe", "Vulpix", "Meowth", "Eevee"] },
      { name: "Route 9 (Kanto)",   encounters: ["Rattata", "Spearow", "Ekans", "Sandshrew", "Nidoran♀", "Nidoran♂"] },
      { name: "Route 10 (Kanto)",  encounters: ["Voltorb", "Magnemite", "Spearow", "Rattata"] },
      { name: "Route 11 (Kanto)",  encounters: ["Spearow", "Drowzee", "Ekans", "Sandshrew", "Fearow"] },
      { name: "Route 12 (Kanto)",  encounters: ["Pidgey", "Snorlax", "Slowpoke", "Bellsprout", "Weepinbell"] },
      { name: "Route 13 (Kanto)",  encounters: ["Pidgey", "Bellsprout", "Weepinbell", "Scyther", "Pinsir"] },
      { name: "Route 14 (Kanto)",  encounters: ["Pidgey", "Oddish", "Gloom", "Bellsprout", "Weepinbell"] },
      { name: "Route 15 (Kanto)",  encounters: ["Pidgey", "Oddish", "Gloom", "Bellsprout", "Venomoth"] },
      { name: "Route 16 (Kanto)",  encounters: ["Rattata", "Spearow", "Doduo", "Snorlax", "Fearow"] },
      { name: "Route 17 (Kanto)",  encounters: ["Rattata", "Fearow", "Doduo", "Dodrio"] },
      { name: "Route 18 (Kanto)",  encounters: ["Rattata", "Fearow", "Doduo", "Dodrio"] },
      { name: "Route 21 (Kanto)",  encounters: ["Tangela", "Magikarp", "Tentacool"] },
      { name: "Route 22 (Kanto)",  encounters: ["Nidoran♀", "Nidoran♂", "Spearow", "Mankey"] },
      { name: "Route 24 (Kanto)",  encounters: ["Weedle", "Caterpie", "Abra", "Bellsprout", "Oddish"] },
      { name: "Route 25 (Kanto)",  encounters: ["Weedle", "Caterpie", "Abra", "Bellsprout", "Oddish"] },
      { name: "Mt. Moon (Kanto)",  encounters: ["Zubat", "Geodude", "Paras", "Clefairy", "Jigglypuff"] },
      { name: "Rock Tunnel (Kanto)", encounters: ["Zubat", "Geodude", "Machop", "Onix", "Marowak"] },
      { name: "Pokémon Tower (Kanto)", encounters: ["Gastly", "Haunter", "Cubone"] },
      { name: "Safari Zone (Kanto)", encounters: ["Kangaskhan", "Tauros", "Scyther", "Pinsir", "Chansey", "Rhyhorn", "Nidoran♀", "Nidoran♂", "Exeggcute", "Dratini"] },
      { name: "Seafoam Islands (Kanto)", encounters: ["Seel", "Shellder", "Horsea", "Krabby", "Psyduck", "Articuno"] },
      { name: "Victory Road (Kanto)", encounters: ["Geodude", "Graveler", "Machop", "Machoke", "Onix", "Rhyhorn", "Moltres"] },
      { name: "Power Plant (Kanto)", encounters: ["Voltorb", "Electrode", "Magnemite", "Magneton", "Electabuzz", "Zapdos"] },
      { name: "Cerulean Cave (Kanto)", encounters: ["Golbat", "Ditto", "Parasect", "Rhydon", "Mewtwo"] },
      { name: "Viridian Forest (Kanto)", encounters: ["Caterpie", "Metapod", "Weedle", "Kakuna", "Pikachu"] },
      { name: "Diglett's Cave (Kanto)", encounters: ["Diglett", "Dugtrio"] },
      // ── GIFTS / STATICS ──
      { name: "Gift — Totodile (New Bark Town)", encounters: ["Totodile"] },
      { name: "Gift — Chikorita (New Bark Town)", encounters: ["Chikorita"] },
      { name: "Gift — Cyndaquil (New Bark Town)", encounters: ["Cyndaquil"] },
      { name: "Gift — Togepi (Mr. Pokémon)", encounters: ["Togepi"] },
      { name: "Gift — Eevee (Bill)", encounters: ["Eevee"] },
      { name: "Gift — Dratini (Dragon's Den)", encounters: ["Dratini"] },
      { name: "Static — Sudowoodo (Route 36)", encounters: ["Sudowoodo"] },
      { name: "Static — Snorlax (Route 11/15 Kanto)", encounters: ["Snorlax"] },
      { name: "Static — Red Gyarados (Lake of Rage)", encounters: ["Gyarados"] },
    ]
  },

  "Sacred Gold": {
    badgeCount: 16,
    routes: [] // Same as Storm Silver — share via reference after load
  },

  // ══════════════════════════════════════════════════════════════
  //  RENEGADE PLATINUM (Sinnoh — Platinum base)
  //  By Drayano. Hardest of the Drayano hacks.
  //  Every route has greatly expanded encounter tables.
  // ══════════════════════════════════════════════════════════════

  "Renegade Platinum": {
    badgeCount: 8,
    routes: [
      { name: "Route 201",         encounters: ["Starly", "Bidoof", "Shinx", "Chimchar", "Piplup", "Turtwig"] },
      { name: "Route 202",         encounters: ["Starly", "Bidoof", "Shinx", "Kricketot"] },
      { name: "Route 203",         encounters: ["Starly", "Bidoof", "Shinx", "Kricketot", "Abra", "Meditite"] },
      { name: "Route 204",         encounters: ["Bidoof", "Kricketot", "Budew", "Wurmple", "Silcoon", "Cascoon", "Buneary"] },
      { name: "Route 205",         encounters: ["Bidoof", "Buizel", "Shellos", "Pachirisu", "Wurmple", "Silcoon", "Cascoon"] },
      { name: "Route 206",         encounters: ["Geodude", "Ponyta", "Gligar", "Kricketune", "Stunky", "Glameow"] },
      { name: "Route 207",         encounters: ["Geodude", "Machop", "Meditite", "Ponyta"] },
      { name: "Route 208",         encounters: ["Bidoof", "Bibarel", "Meditite", "Roselia", "Chansey"] },
      { name: "Route 209",         encounters: ["Bibarel", "Staravia", "Mime Jr.", "Spiritomb"] },
      { name: "Route 210",         encounters: ["Staravia", "Kricketune", "Roselia", "Bonsly", "Chansey", "Scyther"] },
      { name: "Route 211",         encounters: ["Meditite", "Ponyta", "Clefairy", "Chingling"] },
      { name: "Route 212",         encounters: ["Roselia", "Kricketune", "Staravia", "Croagunk", "Scyther", "Pinsir"] },
      { name: "Route 213",         encounters: ["Shellos", "Wingull", "Gastrodon", "Tentacruel"] },
      { name: "Route 214",         encounters: ["Kricketune", "Geodude", "Houndour", "Rhyhorn", "Gligar"] },
      { name: "Route 215",         encounters: ["Kadabra", "Kricketune", "Houndour", "Abra", "Elekid"] },
      { name: "Route 216",         encounters: ["Snover", "Swinub", "Meditite", "Sneasel", "Delibird"] },
      { name: "Route 217",         encounters: ["Snover", "Swinub", "Sneasel", "Mamoswine", "Delibird"] },
      { name: "Route 218",         encounters: ["Mr. Mime", "Floatzel", "Wingull", "Tentacruel"] },
      { name: "Route 219",         encounters: ["Tentacool", "Wingull", "Magikarp"] },
      { name: "Route 220",         encounters: ["Tentacool", "Wingull", "Magikarp"] },
      { name: "Route 221",         encounters: ["Roselia", "Floatzel", "Quagsire", "Snorlax"] },
      { name: "Route 222",         encounters: ["Electabuzz", "Luxio", "Magmar", "Wingull", "Tentacool"] },
      { name: "Route 223",         encounters: ["Tentacruel", "Wingull", "Lumineon", "Gyarados"] },
      { name: "Route 224",         encounters: ["Roserade", "Floatzel", "Beautifly", "Dustox", "Chansey"] },
      { name: "Route 225",         encounters: ["Geodude", "Graveler", "Golbat", "Skuntank", "Gliscor"] },
      { name: "Route 226",         encounters: ["Tentacruel", "Wingull", "Gyarados", "Mantyke"] },
      { name: "Route 227",         encounters: ["Graveler", "Skarmory", "Rhydon", "Magmar", "Macargo"] },
      { name: "Route 228",         encounters: ["Sandshrew", "Cacnea", "Hippopotas", "Rhyhorn", "Gible"] },
      { name: "Route 229",         encounters: ["Roserade", "Budew", "Heracross", "Butterfree", "Beedrill"] },
      { name: "Route 230",         encounters: ["Tentacruel", "Gyarados", "Wingull", "Golduck"] },
      { name: "Eterna Forest",     encounters: ["Buneary", "Silcoon", "Cascoon", "Gastly", "Cherubi", "Murkrow", "Misdreavus"] },
      { name: "Mt. Coronet",       encounters: ["Geodude", "Machop", "Clefairy", "Zubat", "Golbat", "Graveler", "Medicham"] },
      { name: "Wayward Cave",      encounters: ["Geodude", "Zubat", "Bronzor", "Gible"] },
      { name: "Solaceon Ruins",    encounters: ["Unown"] },
      { name: "Lake Valor",        encounters: ["Psyduck", "Golduck", "Marill", "Azumarill"] },
      { name: "Lake Verity",       encounters: ["Psyduck", "Golduck", "Marill"] },
      { name: "Lake Acuity",       encounters: ["Psyduck", "Golduck", "Sneasel"] },
      { name: "Fuego Ironworks",   encounters: ["Koffing", "Magmar", "Elekid"] },
      { name: "Iron Island",       encounters: ["Zubat", "Golbat", "Graveler", "Riolu", "Steelix"] },
      { name: "Snowpoint Temple",  encounters: ["Golbat", "Sneasel", "Jynx", "Regice"] },
      { name: "Victory Road",      encounters: ["Graveler", "Golbat", "Rhyhorn", "Steelix", "Medicham", "Floatzel"] },
      { name: "Pal Park",          encounters: ["Cresselia"] },
      // Gifts/Statics
      { name: "Gift — Chimchar (Rowan Lab)", encounters: ["Chimchar"] },
      { name: "Gift — Piplup (Rowan Lab)",   encounters: ["Piplup"] },
      { name: "Gift — Turtwig (Rowan Lab)",  encounters: ["Turtwig"] },
      { name: "Gift — Happiny (Hiker)",      encounters: ["Happiny"] },
      { name: "Gift — Riolu (Riley)",        encounters: ["Riolu"] },
      { name: "Gift — Porygon (Veilstone)",  encounters: ["Porygon"] },
      { name: "Gift — Eevee (Bebe)",         encounters: ["Eevee"] },
      { name: "Gift — Rotom (TV)",           encounters: ["Rotom"] },
      { name: "Static — Dialga/Palkia",      encounters: ["Dialga", "Palkia"] },
      { name: "Static — Heatran (Stark Mountain)", encounters: ["Heatran"] },
      { name: "Static — Regigigas (Snowpoint)", encounters: ["Regigigas"] },
      { name: "Static — Giratina (Distortion World)", encounters: ["Giratina"] },
      { name: "Static — Cresselia (Full Moon Island)", encounters: ["Cresselia"] },
    ]
  },

  // ══════════════════════════════════════════════════════════════
  //  BLAZE BLACK / VOLT WHITE (Unova — Black/White base)
  // ══════════════════════════════════════════════════════════════

  "Blaze Black": {
    badgeCount: 8,
    routes: [
      { name: "Route 1",           encounters: ["Patrat", "Lillipup", "Purrloin", "Pidove"] },
      { name: "Route 2",           encounters: ["Patrat", "Lillipup", "Purrloin", "Pidove", "Mareep", "Growlithe"] },
      { name: "Route 3",           encounters: ["Pidove", "Blitzle", "Venipede", "Timburr", "Tynamo"] },
      { name: "Route 4",           encounters: ["Sandile", "Darumaka", "Scraggy", "Maractus", "Gothita", "Solosis"] },
      { name: "Route 5",           encounters: ["Minccino", "Liepard", "Gothita", "Solosis", "Trubbish"] },
      { name: "Route 6",           encounters: ["Deerling", "Karrablast", "Shelmet", "Foongus", "Emolga"] },
      { name: "Route 7",           encounters: ["Deerling", "Cubchoo", "Foongus", "Mienfoo", "Absol"] },
      { name: "Route 8",           encounters: ["Frillish", "Shellder", "Corsola"] },
      { name: "Route 9",           encounters: ["Garbodor", "Liepard", "Zangoose", "Seviper"] },
      { name: "Route 10",          encounters: ["Bouffalant", "Heatmor", "Durant", "Mienfoo", "Rufflet", "Vullaby"] },
      { name: "Route 11",          encounters: ["Joltik", "Fraxure", "Axew", "Larvesta"] },
      { name: "Route 12",          encounters: ["Stunfisk", "Basculin", "Palpitoad"] },
      { name: "Route 13",          encounters: ["Tangela", "Tangrowth", "Mienfoo", "Absol"] },
      { name: "Route 14",          encounters: ["Beartic", "Mienshao", "Zoroark", "Cobalion"] },
      { name: "Route 15",          encounters: ["Pawniard", "Vullaby", "Rufflet", "Druddigon"] },
      { name: "Route 16",          encounters: ["Gothorita", "Duosion", "Emolga", "Audino"] },
      { name: "Route 17",          encounters: ["Frillish", "Jellicent", "Basculin"] },
      { name: "Route 18",          encounters: ["Druddigon", "Bouffalant", "Heatmor", "Durant"] },
      { name: "Pinwheel Forest",   encounters: ["Sewaddle", "Venipede", "Cottonee", "Petilil", "Pidove", "Tympole", "Timburr", "Throh", "Sawk"] },
      { name: "Lostlorn Forest",   encounters: ["Roselia", "Swadloon", "Whimsicott", "Lilligant", "Vespiquen"] },
      { name: "Cold Storage",      encounters: ["Vanillite", "Frillish", "Cryogonal"] },
      { name: "Chargestone Cave",  encounters: ["Joltik", "Klink", "Ferroseed", "Boldore", "Tynamo"] },
      { name: "Twist Mountain",    encounters: ["Boldore", "Cryogonal", "Cubchoo", "Woobat", "Gurdurr"] },
      { name: "Dragonspiral Tower",encounters: ["Druddigon", "Golurk", "Golett", "Mienfoo"] },
      { name: "Relic Castle",      encounters: ["Sandile", "Krokorok", "Darumaka", "Yamask", "Baltoy"] },
      { name: "Mistralton Cave",   encounters: ["Boldore", "Woobat", "Axew", "Cobalion"] },
      { name: "Victory Road",      encounters: ["Boldore", "Woobat", "Golurk", "Druddigon", "Deino", "Pawniard"] },
      // Gifts/Statics
      { name: "Gift — Snivy (Nuvema Town)",   encounters: ["Snivy"] },
      { name: "Gift — Tepig (Nuvema Town)",   encounters: ["Tepig"] },
      { name: "Gift — Oshawott (Nuvema Town)",encounters: ["Oshawott"] },
      { name: "Gift — Zorua (Castelia City)", encounters: ["Zorua"] },
      { name: "Gift — Larvesta (Egg — Route 18)", encounters: ["Larvesta"] },
      { name: "Static — Cobalion (Route 13)", encounters: ["Cobalion"] },
      { name: "Static — Terrakion (Victory Road)", encounters: ["Terrakion"] },
      { name: "Static — Virizion (Pinwheel Forest)", encounters: ["Virizion"] },
      { name: "Static — Reshiram/Zekrom (Dragon Spiral)", encounters: ["Reshiram", "Zekrom"] },
    ]
  },

  "Volt White": {
    badgeCount: 8,
    routes: [] // Same encounters as Blaze Black — populated after load
  },

  // ══════════════════════════════════════════════════════════════
  //  BLAZE BLACK 2 / VOLT WHITE 2 (Unova — B2W2 base)
  // ══════════════════════════════════════════════════════════════

  "Blaze Black 2": {
    badgeCount: 8,
    routes: [
      { name: "Route 19",          encounters: ["Patrat", "Purrloin", "Pidove", "Mareep"] },
      { name: "Route 20",          encounters: ["Patrat", "Purrloin", "Pidove", "Sewaddle"] },
      { name: "Route 1",           encounters: ["Patrat", "Lillipup", "Pidove", "Growlithe"] },
      { name: "Route 2",           encounters: ["Patrat", "Lillipup", "Mareep", "Growlithe"] },
      { name: "Route 3",           encounters: ["Blitzle", "Pidove", "Venipede", "Timburr", "Azurill"] },
      { name: "Route 4",           encounters: ["Sandile", "Darumaka", "Scraggy", "Maractus", "Gothita"] },
      { name: "Route 5",           encounters: ["Minccino", "Liepard", "Gothita", "Trubbish", "Solosis"] },
      { name: "Route 6",           encounters: ["Deerling", "Karrablast", "Shelmet", "Foongus", "Emolga"] },
      { name: "Route 7",           encounters: ["Deerling", "Cubchoo", "Foongus", "Mienfoo"] },
      { name: "Route 9",           encounters: ["Garbodor", "Liepard", "Zangoose", "Seviper", "Watchog"] },
      { name: "Route 11",          encounters: ["Joltik", "Fraxure", "Axew", "Archen", "Tirtouga"] },
      { name: "Route 12",          encounters: ["Stunfisk", "Basculin", "Palpitoad"] },
      { name: "Route 13",          encounters: ["Tangela", "Mienfoo", "Absol", "Bouffalant"] },
      { name: "Route 14",          encounters: ["Beartic", "Mienshao", "Zoroark"] },
      { name: "Route 15",          encounters: ["Pawniard", "Vullaby", "Rufflet", "Druddigon"] },
      { name: "Route 16",          encounters: ["Gothorita", "Duosion", "Emolga"] },
      { name: "Route 17",          encounters: ["Frillish", "Jellicent"] },
      { name: "Route 18",          encounters: ["Druddigon", "Bouffalant", "Heatmor", "Durant"] },
      { name: "Virbank Complex",   encounters: ["Roxie Team"] },
      { name: "Floccesy Ranch",    encounters: ["Mareep", "Psyduck", "Azurill"] },
      { name: "Castelia Sewers",   encounters: ["Rattata", "Grimer", "Zubat", "Trubbish"] },
      { name: "Castelia City",     encounters: ["Eevee"] },
      { name: "Pinwheel Forest",   encounters: ["Sewaddle", "Venipede", "Cottonee", "Petilil", "Timburr", "Tympole"] },
      { name: "Lostlorn Forest",   encounters: ["Roselia", "Swadloon", "Whimsicott", "Lilligant"] },
      { name: "Chargestone Cave",  encounters: ["Joltik", "Klink", "Ferroseed", "Boldore", "Tynamo"] },
      { name: "Twist Mountain",    encounters: ["Boldore", "Cryogonal", "Cubchoo", "Woobat", "Gurdurr"] },
      { name: "Dragonspiral Tower",encounters: ["Druddigon", "Golurk", "Golett"] },
      { name: "Relic Castle",      encounters: ["Sandile", "Krokorok", "Yamask", "Baltoy"] },
      { name: "Victory Road",      encounters: ["Boldore", "Woobat", "Golurk", "Druddigon", "Deino"] },
      // Gifts/Statics
      { name: "Gift — Snivy (Aspertia City)",    encounters: ["Snivy"] },
      { name: "Gift — Tepig (Aspertia City)",    encounters: ["Tepig"] },
      { name: "Gift — Oshawott (Aspertia City)", encounters: ["Oshawott"] },
      { name: "Gift — Zorua (Castelia City)",    encounters: ["Zorua"] },
      { name: "Gift — Egg — Larvesta",           encounters: ["Larvesta"] },
      { name: "Static — Cobalion (Mistralton Cave)", encounters: ["Cobalion"] },
      { name: "Static — Terrakion (Route 22)",   encounters: ["Terrakion"] },
      { name: "Static — Virizion (Flocessy Ranch)", encounters: ["Virizion"] },
      { name: "Static — Kyurem (Giant Chasm)",   encounters: ["Kyurem"] },
    ]
  },

  "Volt White 2": {
    badgeCount: 8,
    routes: [] // Same as Blaze Black 2
  },

  // ══════════════════════════════════════════════════════════════
  //  RADICAL RED (Kanto — FireRed base)
  //  Extremely difficult, competitive movesets on all trainers.
  //  All Pokémon available by Brock, abilities changed, etc.
  // ══════════════════════════════════════════════════════════════

  "Radical Red": {
    badgeCount: 8,
    routes: [
      { name: "Route 1",          encounters: ["Pidgey", "Rattata", "Sentret", "Zigzagoon", "Lillipup"] },
      { name: "Route 2",          encounters: ["Pidgey", "Rattata", "Caterpie", "Weedle", "Ekans", "Sandshrew", "Pikachu"] },
      { name: "Route 3",          encounters: ["Spearow", "Jigglypuff", "Mankey", "Machop", "Meditite", "Mienfoo"] },
      { name: "Route 4",          encounters: ["Spearow", "Ekans", "Sandshrew", "Magikarp", "Nidoran♀", "Nidoran♂"] },
      { name: "Route 5",          encounters: ["Pidgey", "Meowth", "Mankey", "Oddish", "Bellsprout", "Drowzee"] },
      { name: "Route 6",          encounters: ["Pidgey", "Meowth", "Mankey", "Oddish", "Bellsprout"] },
      { name: "Route 7",          encounters: ["Pidgey", "Meowth", "Growlithe", "Vulpix", "Snubbull"] },
      { name: "Route 8",          encounters: ["Pidgey", "Meowth", "Growlithe", "Vulpix", "Ekans", "Sandshrew"] },
      { name: "Route 9",          encounters: ["Rattata", "Spearow", "Ekans", "Sandshrew", "Nidoran♀", "Nidoran♂"] },
      { name: "Route 10",         encounters: ["Spearow", "Voltorb", "Magnemite", "Electrode", "Elekid"] },
      { name: "Route 11",         encounters: ["Spearow", "Drowzee", "Ekans", "Sandshrew", "Ditto"] },
      { name: "Route 12",         encounters: ["Pidgey", "Oddish", "Bellsprout", "Venonat", "Slowpoke"] },
      { name: "Route 13",         encounters: ["Pidgey", "Oddish", "Bellsprout", "Venonat", "Weepinbell"] },
      { name: "Route 14",         encounters: ["Pidgey", "Oddish", "Bellsprout", "Scyther", "Pinsir"] },
      { name: "Route 15",         encounters: ["Pidgey", "Oddish", "Gloom", "Weepinbell", "Venomoth"] },
      { name: "Route 16",         encounters: ["Rattata", "Doduo", "Snorlax", "Spearow", "Lickitung"] },
      { name: "Route 17",         encounters: ["Rattata", "Doduo", "Fearow", "Dodrio"] },
      { name: "Route 18",         encounters: ["Rattata", "Doduo", "Fearow", "Dodrio"] },
      { name: "Route 21",         encounters: ["Tangela", "Magikarp", "Tentacool", "Corsola"] },
      { name: "Route 22",         encounters: ["Nidoran♀", "Nidoran♂", "Mankey", "Spearow"] },
      { name: "Route 23",         encounters: ["Fearow", "Nidorino", "Nidorina", "Kadabra", "Golbat"] },
      { name: "Route 24",         encounters: ["Weedle", "Caterpie", "Abra", "Oddish", "Bellsprout"] },
      { name: "Route 25",         encounters: ["Weedle", "Caterpie", "Abra", "Oddish", "Bellsprout"] },
      { name: "Viridian Forest",  encounters: ["Caterpie", "Weedle", "Pikachu", "Kakuna", "Metapod"] },
      { name: "Mt. Moon",         encounters: ["Zubat", "Geodude", "Paras", "Clefairy", "Jigglypuff", "Omanyte", "Kabuto"] },
      { name: "Rock Tunnel",      encounters: ["Zubat", "Geodude", "Machop", "Onix", "Larvitar"] },
      { name: "Pokémon Tower",    encounters: ["Gastly", "Haunter", "Cubone", "Misdreavus"] },
      { name: "Safari Zone",      encounters: ["Kangaskhan", "Tauros", "Scyther", "Pinsir", "Chansey", "Rhyhorn", "Nidoran♀", "Nidoran♂", "Exeggcute", "Dratini", "Larvitar", "Bagon", "Gible"] },
      { name: "Seafoam Islands",  encounters: ["Seel", "Shellder", "Horsea", "Psyduck", "Smoochum", "Articuno"] },
      { name: "Pokémon Mansion",  encounters: ["Growlithe", "Vulpix", "Koffing", "Ditto", "Magmar"] },
      { name: "Victory Road",     encounters: ["Geodude", "Graveler", "Machop", "Onix", "Moltres", "Garchomp", "Salamence"] },
      { name: "Power Plant",      encounters: ["Voltorb", "Electrode", "Electabuzz", "Magnemite", "Jolteon", "Zapdos"] },
      { name: "Cerulean Cave",    encounters: ["Golbat", "Ditto", "Parasect", "Rhydon", "Chansey", "Mewtwo"] },
      { name: "Diglett's Cave",   encounters: ["Diglett", "Dugtrio", "Sandshrew"] },
      // Gifts/Statics
      { name: "Gift — Bulbasaur (Pallet Town)", encounters: ["Bulbasaur"] },
      { name: "Gift — Charmander (Pallet Town)", encounters: ["Charmander"] },
      { name: "Gift — Squirtle (Pallet Town)", encounters: ["Squirtle"] },
      { name: "Gift — Eevee (Celadon Mansion)", encounters: ["Eevee"] },
      { name: "Gift — Lapras (Silph Co.)", encounters: ["Lapras"] },
      { name: "Fossil — Omanyte (Mt. Moon)", encounters: ["Omanyte"] },
      { name: "Fossil — Kabuto (Mt. Moon)", encounters: ["Kabuto"] },
      { name: "Fossil — Aerodactyl (Pallet Museum)", encounters: ["Aerodactyl"] },
      { name: "Static — Snorlax (Route 12)", encounters: ["Snorlax"] },
      { name: "Static — Snorlax (Route 16)", encounters: ["Snorlax"] },
    ]
  },

});

// ── POST-LOAD: Mirror version pairs that share identical data ──────────────
// This runs after the Object.assign so GAME_DATA already has both keys
(function mirrorVersionPairs() {
  const pairs = [
    ["Sacred Gold",  "Storm Silver"],
    ["Volt White",   "Blaze Black"],
    ["Volt White 2", "Blaze Black 2"],
  ];
  pairs.forEach(([target, source]) => {
    if (GAME_DATA[target] && GAME_DATA[source]) {
      GAME_DATA[target].routes = GAME_DATA[source].routes;
    }
  });
})();