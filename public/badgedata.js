// badgedata.js — Badge sprite data
// 📁 Save as: public/badgedata.js
//
// SELF-HOSTING: Create public/badges/ and drop in PNGs named e.g. "Boulder_Badge.png"
// Download from: https://archives.bulbagarden.net/wiki/{Name}_Badge
//
// Load order in index.html: gamedata.js → badgedata.js → gamedata-gen1.js → ... → app.js

// ── Badge definitions FIRST (must be before BADGE_DATA which references them) ──

const B = (name, url) => ({ name, url });

const KANTO_BADGES = [
  B("Boulder Badge", "https://archives.bulbagarden.net/media/upload/d/dd/Boulder_Badge.png"),
  B("Cascade Badge", "https://archives.bulbagarden.net/media/upload/9/9c/Cascade_Badge.png"),
  B("Thunder Badge", "https://archives.bulbagarden.net/media/upload/a/a6/Thunder_Badge.png"),
  B("Rainbow Badge", "https://archives.bulbagarden.net/media/upload/b/b5/Rainbow_Badge.png"),
  B("Soul Badge",    "https://archives.bulbagarden.net/media/upload/7/7d/Soul_Badge.png"),
  B("Marsh Badge",   "https://archives.bulbagarden.net/media/upload/6/6b/Marsh_Badge.png"),
  B("Volcano Badge", "https://archives.bulbagarden.net/media/upload/1/12/Volcano_Badge.png"),
  B("Earth Badge",   "https://archives.bulbagarden.net/media/upload/7/78/Earth_Badge.png"),
];

const JOHTO_BADGES = [
  B("Zephyr Badge",  "https://archives.bulbagarden.net/media/upload/4/4a/Zephyr_Badge.png"),
  B("Hive Badge",    "https://archives.bulbagarden.net/media/upload/0/08/Hive_Badge.png"),
  B("Plain Badge",   "https://archives.bulbagarden.net/media/upload/a/a7/Plain_Badge.png"),
  B("Fog Badge",     "https://archives.bulbagarden.net/media/upload/4/48/Fog_Badge.png"),
  B("Storm Badge",   "https://archives.bulbagarden.net/media/upload/b/b9/Storm_Badge.png"),
  B("Mineral Badge", "https://archives.bulbagarden.net/media/upload/7/7b/Mineral_Badge.png"),
  B("Glacier Badge", "https://archives.bulbagarden.net/media/upload/e/e6/Glacier_Badge.png"),
  B("Rising Badge",  "https://archives.bulbagarden.net/media/upload/5/58/Rising_Badge.png"),
  B("Boulder Badge", "https://archives.bulbagarden.net/media/upload/d/dd/Boulder_Badge.png"),
  B("Cascade Badge", "https://archives.bulbagarden.net/media/upload/9/9c/Cascade_Badge.png"),
  B("Thunder Badge", "https://archives.bulbagarden.net/media/upload/a/a6/Thunder_Badge.png"),
  B("Rainbow Badge", "https://archives.bulbagarden.net/media/upload/b/b5/Rainbow_Badge.png"),
  B("Soul Badge",    "https://archives.bulbagarden.net/media/upload/7/7d/Soul_Badge.png"),
  B("Marsh Badge",   "https://archives.bulbagarden.net/media/upload/6/6b/Marsh_Badge.png"),
  B("Volcano Badge", "https://archives.bulbagarden.net/media/upload/1/12/Volcano_Badge.png"),
  B("Earth Badge",   "https://archives.bulbagarden.net/media/upload/7/78/Earth_Badge.png"),
];

const HOENN_BADGES = [
  B("Stone Badge",   "https://archives.bulbagarden.net/media/upload/6/63/Stone_Badge.png"),
  B("Knuckle Badge", "https://archives.bulbagarden.net/media/upload/9/97/Knuckle_Badge.png"),
  B("Dynamo Badge",  "https://archives.bulbagarden.net/media/upload/3/34/Dynamo_Badge.png"),
  B("Heat Badge",    "https://archives.bulbagarden.net/media/upload/c/c4/Heat_Badge.png"),
  B("Balance Badge", "https://archives.bulbagarden.net/media/upload/6/63/Balance_Badge.png"),
  B("Feather Badge", "https://archives.bulbagarden.net/media/upload/6/62/Feather_Badge.png"),
  B("Mind Badge",    "https://archives.bulbagarden.net/media/upload/c/cc/Mind_Badge.png"),
  B("Rain Badge",    "https://archives.bulbagarden.net/media/upload/9/9b/Rain_Badge.png"),
];

const SINNOH_BADGES = [
  B("Coal Badge",    "https://archives.bulbagarden.net/media/upload/0/0b/Coal_Badge.png"),
  B("Forest Badge",  "https://archives.bulbagarden.net/media/upload/8/8c/Forest_Badge.png"),
  B("Cobble Badge",  "https://archives.bulbagarden.net/media/upload/2/27/Cobble_Badge.png"),
  B("Fen Badge",     "https://archives.bulbagarden.net/media/upload/1/13/Fen_Badge.png"),
  B("Relic Badge",   "https://archives.bulbagarden.net/media/upload/2/28/Relic_Badge.png"),
  B("Mine Badge",    "https://archives.bulbagarden.net/media/upload/f/fe/Mine_Badge.png"),
  B("Icicle Badge",  "https://archives.bulbagarden.net/media/upload/0/09/Icicle_Badge.png"),
  B("Beacon Badge",  "https://archives.bulbagarden.net/media/upload/0/0c/Beacon_Badge.png"),
];

const UNOVA_BADGES = [
  B("Trio Badge",    "https://archives.bulbagarden.net/media/upload/7/74/Trio_Badge.png"),
  B("Basic Badge",   "https://archives.bulbagarden.net/media/upload/8/85/Basic_Badge.png"),
  B("Insect Badge",  "https://archives.bulbagarden.net/media/upload/8/8a/Insect_Badge.png"),
  B("Bolt Badge",    "https://archives.bulbagarden.net/media/upload/5/5b/Bolt_Badge.png"),
  B("Quake Badge",   "https://archives.bulbagarden.net/media/upload/2/29/Quake_Badge.png"),
  B("Jet Badge",     "https://archives.bulbagarden.net/media/upload/9/9c/Jet_Badge.png"),
  B("Freeze Badge",  "https://archives.bulbagarden.net/media/upload/a/ac/Freeze_Badge.png"),
  B("Legend Badge",  "https://archives.bulbagarden.net/media/upload/c/c0/Legend_Badge.png"),
];

const UNOVA2_BADGES = [
  B("Basic Badge",   "https://archives.bulbagarden.net/media/upload/8/85/Basic_Badge.png"),
  B("Toxic Badge",   "https://archives.bulbagarden.net/media/upload/3/3e/Toxic_Badge.png"),
  B("Insect Badge",  "https://archives.bulbagarden.net/media/upload/8/8a/Insect_Badge.png"),
  B("Bolt Badge",    "https://archives.bulbagarden.net/media/upload/5/5b/Bolt_Badge.png"),
  B("Quake Badge",   "https://archives.bulbagarden.net/media/upload/2/29/Quake_Badge.png"),
  B("Jet Badge",     "https://archives.bulbagarden.net/media/upload/9/9c/Jet_Badge.png"),
  B("Freeze Badge",  "https://archives.bulbagarden.net/media/upload/a/ac/Freeze_Badge.png"),
  B("Legend Badge",  "https://archives.bulbagarden.net/media/upload/c/c0/Legend_Badge.png"),
];

// ── Game → Badge array ────────────────────────────────────────────────────

const BADGE_DATA = {
  "Pokémon Red":        KANTO_BADGES,
  "Pokémon Blue":       KANTO_BADGES,
  "Pokémon Yellow":     KANTO_BADGES,
  "Pokémon FireRed":    KANTO_BADGES,
  "Pokémon LeafGreen":  KANTO_BADGES,
  "Radical Red":        KANTO_BADGES,
  "Pokémon Gold":       JOHTO_BADGES,
  "Pokémon Silver":     JOHTO_BADGES,
  "Pokémon Crystal":    JOHTO_BADGES,
  "Pokémon HeartGold":  JOHTO_BADGES,
  "Pokémon SoulSilver": JOHTO_BADGES,
  "Storm Silver":       JOHTO_BADGES,
  "Sacred Gold":        JOHTO_BADGES,
  "Pokémon Ruby":       HOENN_BADGES,
  "Pokémon Sapphire":   HOENN_BADGES,
  "Pokémon Emerald":    HOENN_BADGES,
  "Pokémon Diamond":    SINNOH_BADGES,
  "Pokémon Pearl":      SINNOH_BADGES,
  "Pokémon Platinum":   SINNOH_BADGES,
  "Renegade Platinum":  SINNOH_BADGES,
  "Pokémon Black":      UNOVA_BADGES,
  "Pokémon White":      UNOVA_BADGES,
  "Blaze Black":        UNOVA_BADGES,
  "Volt White":         UNOVA_BADGES,
  "Pokémon Black 2":    UNOVA2_BADGES,
  "Pokémon White 2":    UNOVA2_BADGES,
  "Blaze Black 2":      UNOVA2_BADGES,
  "Volt White 2":       UNOVA2_BADGES,
};

function getBadges(gameName)    { return BADGE_DATA[gameName] || null; }
function badgeLocalUrl(badgeName) { return `badges/${badgeName.replace(/ /g, '_')}.png`; }