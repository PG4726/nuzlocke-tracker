// ─────────────────────────────────────────────
//  POKÉDEX PANEL
// ─────────────────────────────────────────────
let dexOpen = false;
let dexLoaded = false;



// ─────────────────────────────────────────────
//  DAMAGE CALCULATOR (KinglerCalc embed)
// ─────────────────────────────────────────────
let calcOpen   = false;
let calcLoaded = false;
let calcDark   = false;
const CALC_URL = 'https://www.kinglercalc.com/';

function toggleCalc() {
  calcOpen = !calcOpen;
  const overlay = document.getElementById('calc-overlay');
  const btn     = document.getElementById('calc-btn');
  const iframe  = document.getElementById('calc-iframe');

  overlay.classList.toggle('hidden', !calcOpen);
  btn.classList.toggle('active', calcOpen);

  if (calcOpen && !calcLoaded) {
    iframe.src = CALC_URL;
    calcLoaded = true;
  }
}

function calcOpenTab() {
  window.open(CALC_URL, '_blank');
}

function calcIframeLoaded(iframe) {
  if (iframe.src && iframe.src !== 'about:blank') {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc || !doc.body || doc.body.innerHTML.trim() === '') {
        document.getElementById('calc-blocked-banner')?.classList.remove('hidden');
      }
    } catch(e) {
      // Cross-origin — loaded fine
      document.getElementById('calc-blocked-banner')?.classList.add('hidden');
    }
  }
}

function toggleCalcTheme() {
  calcDark = !calcDark;
  const iframe = document.getElementById('calc-iframe');
  const btn    = document.getElementById('calc-theme-btn');
  if (calcDark) {
    iframe.style.filter = 'invert(1) hue-rotate(155deg) saturate(1.2) brightness(0.92)';
    btn.textContent = '◑ FILTER ON';
    btn.classList.add('active');
  } else {
    iframe.style.filter = 'brightness(0.92) contrast(1.02)';
    btn.textContent = '◑ FILTER OFF';
    btn.classList.remove('active');
  }
}

let dexDark = false;

function toggleDexTheme() {
  dexDark = !dexDark;
  const iframe = document.getElementById('dex-iframe');
  const btn    = document.getElementById('dex-theme-btn');
  if (dexDark) {
    iframe.style.filter = 'invert(1) hue-rotate(155deg) saturate(1.2) brightness(0.92)';
    btn.textContent = '◑ FILTER ON';
    btn.classList.add('active');
  } else {
    iframe.style.filter = 'brightness(0.92) contrast(1.02)';
    btn.textContent = '◑ FILTER OFF';
    btn.classList.remove('active');
  }
}

let dexCurrentUrl = 'https://dex.pokemonshowdown.com/';

function toggleDex() {
  dexOpen = !dexOpen;
  const overlay = document.getElementById('dex-overlay');
  const btn     = document.getElementById('dex-btn');
  const iframe  = document.getElementById('dex-iframe');

  overlay.classList.toggle('hidden', !dexOpen);
  btn.classList.toggle('active', dexOpen);

  if (dexOpen && !dexLoaded) {
    iframe.src = dexCurrentUrl;
    dexLoaded = true;
  }
  if (dexOpen) {
    setTimeout(() => document.getElementById('dex-search-input')?.focus(), 120);
  }
}

function openDexFor(species) {
  const slug = species.toLowerCase()
    .replace(/[éèê]/g,'e').replace(/[àâ]/g,'a')
    .replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')
    .replace(/-+/g,'-').replace(/^-|-$/g,'');
  dexCurrentUrl = `https://dex.pokemonshowdown.com/pokemon/${slug}`;
  const iframe  = document.getElementById('dex-iframe');
  if (iframe) iframe.src = dexCurrentUrl;
  dexLoaded = true;
  dexOpen   = true;
  document.getElementById('dex-overlay').classList.remove('hidden');
  document.getElementById('dex-btn').classList.add('active');
  document.getElementById('dex-blocked-banner')?.classList.add('hidden');
  const input = document.getElementById('dex-search-input');
  if (input) input.value = species;
}

function dexSearch(e) {
  e.preventDefault();
  const val = document.getElementById('dex-search-input')?.value.trim();
  if (!val) return;
  openDexFor(val);
}

function dexOpenTab() {
  window.open(dexCurrentUrl, '_blank');
}

function dexIframeLoaded(iframe) {
  // If Showdown sends X-Frame-Options: DENY/SAMEORIGIN, the iframe stays blank
  // We can't read cross-origin contentDocument, so detect via a short timeout:
  // if the iframe src is not blank but appears empty after load, show the banner
  if (iframe.src && iframe.src !== 'about:blank') {
    try {
      // Will throw if cross-origin blocked
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc || !doc.body || doc.body.innerHTML.trim() === '') {
        document.getElementById('dex-blocked-banner')?.classList.remove('hidden');
      }
    } catch(e) {
      // Cross-origin — iframe loaded but we can't inspect it — that's fine, Showdown is showing
      document.getElementById('dex-blocked-banner')?.classList.add('hidden');
    }
  }
}

// ─────────────────────────────────────────────
//  SIDEBAR TOGGLE (Notion-style)
// ─────────────────────────────────────────────
let sidebarOpen = true;

function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('sidebar-toggle');
  const layout  = document.querySelector('.layout');

  sidebar.classList.toggle('hidden', !sidebarOpen);
  toggle.classList.toggle('collapsed', !sidebarOpen);
  toggle.textContent = sidebarOpen ? '◀' : '▶';
  layout.classList.toggle('sidebar-hidden', !sidebarOpen);
}


// ─────────────────────────────────────────────
//  SIDEBAR — active run display + drawer
// ─────────────────────────────────────────────
function toggleRunsDrawer() {
  const drawer  = document.getElementById('runs-drawer');
  const toggle  = document.getElementById('runs-drawer-toggle');
  const isOpen  = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  toggle.classList.toggle('open', !isOpen);
}

function updateActiveRunDisplay(run) {
  const el = document.getElementById('active-run-display');
  if (!el) return;
  if (!run) {
    el.innerHTML = '<div class="no-active-run">SELECT OR CREATE A RUN BELOW</div>';
    return;
  }
  const statusColor = run.status === 'won'  ? 'var(--neon-yellow)'
                    : run.status === 'lost' ? 'var(--neon-red)'
                    : 'var(--neon-cyan)';
  const maxB = getBadgeCount(run.game);
  el.innerHTML = `
    <div class="active-run-card">
      <div class="arc-label">NOW PLAYING</div>
      <div class="arc-name">${escapeHtml(run.game)}</div>
      <div class="arc-meta" style="color:${statusColor}">
        ${run.status.toUpperCase()} &nbsp;&middot;&nbsp;
        <span style="color:var(--neon-yellow)">${run.badges}</span>
        <span style="color:var(--text-dim)">/${maxB} ✦</span>
      </div>
    </div>`;
}

// app.js — Frontend Logic
//
// This file runs IN the browser (not on the server).
// It handles:
//   - Button clicks, form submissions
//   - Talking to the backend via "fetch()" — sending/receiving data over HTTP
//   - Updating the page HTML dynamically without reloading
//
// KEY CONCEPT: fetch() sends requests to the server.
//   const response = await fetch('/api/runs');     ← Ask server for data
//   const data = await response.json();            ← Parse the JSON response
//
// "await" means: wait for this to finish before moving on.
// Functions that use "await" must be marked "async".


// ─────────────────────────────────────────────
//  STATE — what the app currently "knows"
// ─────────────────────────────────────────────
let currentRunId = null;   // Which run is open
let allPokemon   = [];     // All Pokémon for the current run
let editingMonId = null;   // Which Pokémon is in the edit modal

// ─────────────────────────────────────────────
//  SPRITES — Pokémon Showdown animated GIFs
// ─────────────────────────────────────────────
// Showdown hosts animated Gen 5 sprites as plain GIF files.
// URL pattern: https://play.pokemonshowdown.com/sprites/ani/{name}.gif
// No API call needed — we just build the URL directly from the species name!
//
// Name formatting rules:
//   "Nidoran-F"  → "nidoran-f"
//   "Mr. Mime"   → "mr-mime"
//   "Farfetch'd" → "farfetchd"
//   "Ho-Oh"      → "ho-oh"  (real hyphens stay)

function showdownName(species) {
  return species
    .toLowerCase()
    .trim()
    .replace(/♀/g, '-f')            // Nidoran♀ → nidoran-f
    .replace(/♂/g, '-m')            // Nidoran♂ → nidoran-m
    .replace(/['.:\u2019]/g, '')    // remove apostrophes, dots, colons
    .replace(/\s+/g, '-')           // spaces to hyphens
    .replace(/--+/g, '-');          // collapse any double hyphens
}

// Primary: static Gen 5 pixel PNG (Showdown gen5 folder — reliable pixel art)
// We skip sprites/ani/ entirely — Showdown has replaced many of those with 3D HOME renders.
function spriteUrl(species) {
  return `https://play.pokemonshowdown.com/sprites/gen5/${showdownName(species)}.png`;
}

// Fallback: PokeAPI BW sprite — covers anything Showdown gen5 is missing
function spriteFallbackUrl(species) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${showdownName(species)}.png`;
}

// Async PokeAPI lookup — prefers pixel art, falls back through gens to front_default
async function fetchPokeApiSprite(species) {
  try {
    const name = showdownName(species);
    const res  = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) return null;
    const data = await res.json();
    const v = data.sprites?.versions || {};
    // Prefer pixel art in generation order (Gen 5 BW is sharpest)
    return v['generation-v']?.['black-white']?.front_default
        || v['generation-vi']?.['x-y']?.front_default
        || v['generation-vii']?.['ultra-sun-ultra-moon']?.front_default
        || v['generation-viii']?.['icons']?.front_default
        || data.sprites?.front_default
        || null;
  } catch {
    return null;
  }
}

// Showdown HOME 3D model — used as penultimate fallback for Gen 6+ Pokémon
function spriteHomeUrl(species) {
  return `https://play.pokemonshowdown.com/sprites/home/${showdownName(species)}.png`;
}

// onerror chain:
//   1. Showdown gen5 pixel PNG  (primary — great for Gen 1-5)
//   2. PokeAPI pixel sprite      (covers Gen 1-8 with pixel art where available)
//   3. Showdown HOME 3D model    (covers all gens including Gen 6+)
//   4. ? placeholder             (ultimate fallback)
function onSpriteError(img) {
  const fallback = img.dataset.fallback || '0';

  if (fallback === '0') {
    // Step 1 → Step 2: try PokeAPI
    img.dataset.fallback = '1';
    img.style.opacity = '0.3';
    fetchPokeApiSprite(img.alt).then(url => {
      if (url) {
        img.src = url;
        img.style.opacity = '1';
      } else {
        // Step 3: try Showdown HOME 3D model
        img.dataset.fallback = '2';
        img.src = spriteHomeUrl(img.alt);
        img.style.opacity = '1';
      }
    });
  } else if (fallback === '1') {
    // PokeAPI img itself errored — try HOME
    img.dataset.fallback = '2';
    img.src = spriteHomeUrl(img.alt);
  } else {
    // All sources failed — show placeholder
    img.parentElement.innerHTML = '<div class="sprite-unknown">?</div>';
  }
}




// ─────────────────────────────────────────────
//  ZOOM CONTROLS
// ─────────────────────────────────────────────
let currentZoom = parseFloat(localStorage.getItem('nz-zoom') || '1');

function applyZoom(z) {
  currentZoom = Math.min(1.5, Math.max(0.6, z));
  // Drive zoom purely via font-size on :root — everything in rem/em scales with it.
  // Layout stays fluid, no clipping, no scrollbars.
  document.documentElement.style.fontSize = (currentZoom * 16) + 'px';
  const display = document.getElementById('zoom-level-display');
  if (display) display.textContent = Math.round(currentZoom * 100) + '%';
  localStorage.setItem('nz-zoom', currentZoom);
}

function initZoom() {
  applyZoom(currentZoom);
  document.getElementById('zoom-in-btn')?.addEventListener('click',  () => applyZoom(currentZoom + 0.1));
  document.getElementById('zoom-out-btn')?.addEventListener('click', () => applyZoom(currentZoom - 0.1));
  document.getElementById('zoom-reset-btn')?.addEventListener('click',() => applyZoom(1));
}


// ─────────────────────────────────────────────
//  REPEL MANIPULATION STRATEGIES
// ─────────────────────────────────────────────
// Full table: game / route / repel type / target species / level trick / step count
const REPEL_STRATS = [
  // ── GEN 1 ──
  { game:"Gen 1 (RBY)",   route:"Safari Zone",           repel:"Super Repel", target:"Scyther / Pinsir",   trick:"Lead lv.22-23 to block Nidoran, expose Scyther slot", steps:"500 steps (full Safari)" },
  { game:"Gen 1 (RBY)",   route:"Seafoam Islands B3F",   repel:"Max Repel",   target:"Articuno",            trick:"Lead lv.49 — repels all wild encounters on the floor", steps:"No step limit in dungeon" },

  // ── GEN 2 ──
  { game:"Gen 2 (GSC)",   route:"Mt. Silver",            repel:"Max Repel",   target:"Larvitar",            trick:"Lead lv.27 forces Larvitar (lv.20-25) slot to appear",  steps:"250 steps" },
  { game:"Gen 2 (GSC)",   route:"Ice Path B2F",          repel:"Super Repel", target:"Delibird",            trick:"Lead lv.29-33, repels Jynx & Swinub, exposes Delibird", steps:"150 steps" },
  { game:"Gen 2 (GSC)",   route:"National Park",         repel:"Repel",       target:"Scyther / Pinsir",    trick:"Lead lv.12, repels Caterpie/Metapod, exposes lv.13 slot",steps:"Contest area only" },

  // ── GEN 3 ──
  { game:"Gen 3 (RSE)",   route:"Safari Zone (Emerald)",  repel:"Super Repel", target:"Heracross",          trick:"Lead lv.27, repels Natu/Girafarig, exposes Heracross slot",steps:"500 steps" },
  { game:"Gen 3 (RSE)",   route:"Fiery Path",             repel:"Repel",       target:"Torkoal",            trick:"Lead lv.19 blocks Machop, exposes Torkoal (lv.18-20)",    steps:"100 steps" },
  { game:"Gen 3 (RSE)",   route:"Meteor Falls B1F-2",    repel:"Max Repel",   target:"Bagon",              trick:"Lead lv.44, repels all common mons, forces Bagon slot",   steps:"300 steps" },
  { game:"Gen 3 (FRLG)",  route:"Cerulean Cave 1F",      repel:"Max Repel",   target:"Chansey",            trick:"Lead lv.52, repels Ditto/Wobbuffet, exposes Chansey",     steps:"200 steps" },

  // ── GEN 4 ──
  { game:"Gen 4 (DPPt)",  route:"Route 225",             repel:"Max Repel",   target:"Ditto",              trick:"Lead lv.47 blocks Fearow/Raticate, exposes Ditto (lv.48-50)",steps:"200 steps" },
  { game:"Gen 4 (DPPt)",  route:"Mt. Coronet 4F",       repel:"Super Repel", target:"Clefairy",           trick:"Lead lv.28 blocks Zubat/Geodude, forces Clefairy slot",   steps:"150 steps" },
  { game:"Gen 4 (DPPt)",  route:"Victory Road (Pt)",    repel:"Max Repel",   target:"Gabite",             trick:"Lead lv.41 repels Steelix/Graveler, exposes Gabite",      steps:"300 steps" },
  { game:"Gen 4 (HGSS)",  route:"Safari Zone (custom)", repel:"Max Repel",   target:"Kangaskhan",         trick:"Lead lv.23-25, repels common slots, exposes Kangaskhan",  steps:"500 steps" },
  { game:"Gen 4 (HGSS)",  route:"Mt. Silver (floor 1)", repel:"Max Repel",   target:"Larvitar",           trick:"Lead lv.30, repels Ursaring/Donphan, forces Larvitar",    steps:"200 steps" },

  // ── GEN 5 ──
  { game:"Gen 5 (BW)",    route:"Route 13",              repel:"Super Repel", target:"Larvesta",           trick:"Lead lv.67+ repels everything else; Larvesta at lv.70",  steps:"250 steps" },
  { game:"Gen 5 (BW)",    route:"Route 8 (surf)",        repel:"Repel",       target:"Stunfisk",           trick:"Lead lv.24, repels Frillish, exposes Stunfisk (lv.25-27)",steps:"100 steps (surfing)" },
  { game:"Gen 5 (B2W2)",  route:"Reversal Mountain",    repel:"Super Repel", target:"Heatran (post-game)",trick:"Lead lv.65, repels Numel/Buneary, forces Heatran encounter",steps:"300 steps" },
  { game:"Gen 5 (B2W2)",  route:"Floccesy Ranch",       repel:"Repel",       target:"Mareep",             trick:"Lead lv.3 — Repel blocks nothing but forces you into only lv.4 slot",steps:"50 steps" },

  // ── GEN 6 ──
  { game:"Gen 6 (XY)",    route:"Friend Safari",         repel:"N/A",         target:"Any Safari species", trick:"Friend Safari species are fixed per friend — no level trick needed, encounters always lv.30",steps:"No steps needed" },
  { game:"Gen 6 (XY)",    route:"Route 21",              repel:"Super Repel", target:"Hawlucha",           trick:"Lead lv.30, repels Noctowl/Altaria, forces Hawlucha at lv.31-32",steps:"200 steps" },
  { game:"Gen 6 (ORAS)",  route:"Route 113",             repel:"Repel",       target:"Skarmory",           trick:"Lead lv.26 repels Spinda/Seviper, exposes Skarmory (lv.27-28)",steps:"150 steps" },

  // ── GEN 7 ──
  { game:"Gen 7 (SM)",    route:"Wela Volcano Park",     repel:"Super Repel", target:"Kangaskhan",         trick:"Lead lv.18 repels Cubone, forces Kangaskhan (lv.19-22) slot",steps:"100 steps" },
  { game:"Gen 7 (SM)",    route:"Lush Jungle",           repel:"Max Repel",   target:"Jangmo-o",           trick:"Lead lv.24 repels Fomantis/Comfey, exposes Jangmo-o at lv.25-27",steps:"200 steps" },
  { game:"Gen 7 (USUM)",  route:"Poni Plains",           repel:"Max Repel",   target:"Kommo-o",            trick:"Lead lv.55, repels everything below, forces Kommo-o (lv.57-59)",steps:"300 steps" },

  // ── GEN 8 ──
  { game:"Gen 8 (SwSh)",  route:"Wild Area: Lake of Outrage",repel:"N/A",    target:"Version-exclusive dens",trick:"Weather-locked dens don't use repels — use Max Lure instead for overworld",steps:"Overworld, no steps" },
  { game:"Gen 8 (SwSh)",  route:"Route 7 (grass)",       repel:"Max Lure",    target:"Jangmo-o",           trick:"Max Lure repels mons below lv.35; lead lv.35 exposes Jangmo-o slot",steps:"250 steps" },

  // ── GEN 9 ──
  { game:"Gen 9 (SV)",    route:"Glaseado Mountain",     repel:"N/A (no repels in SV)",target:"Frigibax",  trick:"In SV, use Let's Go to auto-battle and avoid encounters. Frigibax spawns near the summit.",steps:"Overworld spawn — no repel needed" },
  { game:"Gen 9 (SV)",    route:"Area Zero",             repel:"N/A",         target:"Paradox mons",       trick:"Paradox Pokémon have fixed overworld spawns in Area Zero. Walk directly to spawn locations.", steps:"Fixed positions, no steps" },

  // ── GENERAL MECHANICS ──
  { game:"All gens",      route:"Any route",             repel:"Repel / Super / Max",target:"Any target above your lead",trick:"Repels block encounters where wild lv. ≤ lead lv. Your lead must be at or below the target level for it to work.",steps:"Repel: 100 steps / Super: 200 / Max: 250" },
];

function renderRepelStrats() {
  const container = document.getElementById('repel-strats-body');
  if (!container) return;
  const games = [...new Set(REPEL_STRATS.map(r => r.game))];
  container.innerHTML = games.map(game => {
    const rows = REPEL_STRATS.filter(r => r.game === game);
    const rowsHtml = rows.map(r => `
      <tr class="repel-row">
        <td class="repel-td repel-route">${r.route}</td>
        <td class="repel-td repel-repel">${r.repel}</td>
        <td class="repel-td repel-target">${r.target}</td>
        <td class="repel-td repel-trick">${r.trick}</td>
      </tr>`).join('');
    return `
      <div class="repel-game-group">
        <div class="repel-game-label">${game}</div>
        <table class="repel-table">
          <thead><tr>
            <th class="repel-th">ROUTE</th>
            <th class="repel-th">REPEL</th>
            <th class="repel-th">TARGET</th>
            <th class="repel-th">TRICK</th>
          </tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>`;
  }).join('');
}

function toggleRepelStrats() {
  const body   = document.getElementById('repel-strats-body');
  const toggle = document.getElementById('repel-toggle-btn');
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  toggle.textContent = isOpen ? '▼ SHOW' : '▲ HIDE';
  if (!isOpen) renderRepelStrats();
}

// ─────────────────────────────────────────────
//  FUN FACTS — Nuzlocke tips + Pokédex trivia
// ─────────────────────────────────────────────
const FACTS = [
  // ── EXISTING: NUZLOCKE STRATEGY ──
  { cat:"NUZLOCKE",  text:"The single most common Nuzlocke-ending battle across all gens is Cynthia's Garchomp. Its Speed tier and Earthquake/Dragon Rush coverage has killed more runs than any single Pokémon in history." },
  { cat:"NUZLOCKE",  text:"Status moves win Nuzlockes. A paralysed or sleeping enemy takes exponentially less damage per turn — your team survives longer on fewer heals." },
  { cat:"NUZLOCKE",  text:"Never enter a rival battle on the route before a gym without a full heal. Rival fights have no forced save point before them and their teams are deceptively strong mid-game." },
  { cat:"NUZLOCKE",  text:"Keep a dedicated HM Slave in your PC. One death to Surf or Fly means losing a core team member permanently." },
  { cat:"NUZLOCKE",  text:"Type coverage beats raw power. A team with overlapping weaknesses will eventually run into a trainer who hard counters four of your six in one fight." },
  { cat:"NUZLOCKE",  text:"The mid-game is statistically the most dangerous part of a Nuzlocke — not the Elite Four. Trainer density spikes before Gym 5-6 while your team is still mid-evolution." },
  { cat:"ITEMS",     text:"Held items matter more in Nuzlockes than in normal runs. Leftovers on a tanky Pokémon can turn a 2HKO into a 3HKO and save your entire run." },
  { cat:"STATUS",    text:"Paralysis halves Speed and gives a 25% chance to fully lose a turn. Against fast sweepers, a well-timed Thunder Wave is worth more than an extra attacker." },
  { cat:"SPEED",     text:"Speed ties are resolved randomly. If you're relying on outspeeding an enemy by exactly 1 stat point, verify with a calculator — don't assume." },
  { cat:"NUZLOCKE",  text:"The Rival fight before the E4 in Gen 1 is a trap. Many players have entered that room healed for the E4 and got swept by a full-restore Blastoise they forgot was level 65." },
  { cat:"NUZLOCKE",  text:"In Gen 5, N's final battle has a fully healed Reshiram or Zekrom immediately followed by Ghetsis. Many Nuzlockes die to not saving a Full Restore for the transition." },
  { cat:"LEAD",      text:"Whitney's Miltank has Attract + Rollout + Milk Drink. The Attract strategy requires you to have a female Pokémon or one immune to Attract. Plan around this — don't walk in blind." },
  { cat:"GRINDING",  text:"Don't evolve just because you can. Charmeleon learns Slash at level 33. Charizard doesn't learn it at all — missing it means losing your best physical STAB for the entire mid-game." },
  { cat:"NUZLOCKE",  text:"Identify the three trainer battles in your game with the highest historical Nuzlocke kill rates. For Gen 4: Cyrus 2, Cynthia, and the Rival before Snowpoint City." },
  { cat:"ITEMS",     text:"In Gen 4 and later, Quick Balls have a 4× catch rate on turn 1. Throw one at every wild encounter before doing anything else. You will save Poké Balls and preserve HP." },

  // ── SPEED TIERS & PRIORITY ──
  { cat:"SPEED",     text:"Priority moves bypass Speed entirely. Aqua Jet, Bullet Punch, Mach Punch, Quick Attack, Sucker Punch, and Ice Shard all go first at +1 priority. Keep one on your team to revenge-kill threats that outspeed you." },
  { cat:"SPEED",     text:"Scarf items don't exist in the main story, but stat-lowering moves do. Growl stacks multiplicatively. Two Growls plus a burn can turn a 2HKO into a 5HKO on a physical attacker." },
  { cat:"SPEED",     text:"Tailwind doubles your entire team's Speed for 4 turns. One Tailwind user can let your whole team outspeed threats they normally couldn't. Noctowl, Pelipper, and Jumpluff all learn it early." },
  { cat:"SPEED",     text:"Paralysis reduces Speed to 50% in Gen 6+, and to 25% in Gen 1-5. A paralysed Starmie drops from 115 Speed to 57 — suddenly your Kadabra outspeeds it. Stun Spore is underrated insurance." },
  { cat:"SPEED",     text:"Trick Room reverses the Speed order for 5 turns. If a boss fight has a slow but powerful lead (like Cynthia's Spiritomb), your own Trick Room user can let a slow, powerful mon sweep first." },
  { cat:"SPEED",     text:"Nature affects base stats by 10%. A Modest nature raises SpAtk but lowers Attack. For Nuzlockes, check your caught Pokémon's nature — a Timid Jolteon may already outspeed threats a Quirky one wouldn't." },
  { cat:"SPEED",     text:"Agility doubles Speed. One use on a Charizard or Dodrio puts them above virtually every enemy in the game. It's a free sweep setup against any non-priority user." },
  { cat:"SPEED",     text:"Extreme Speed (priority +2) and Fake Out (priority +3, first turn only) beat nearly every other move. Arcanine and Ambipom are underused Nuzlocke weapons because of these moves." },

  // ── STATUS ABUSE ──
  { cat:"STATUS",    text:"Sleep is the strongest status in early gens. In Gen 1-4, sleep damage still happens while asleep. In Gen 5+, the target doesn't lose its sleep turn on wake. Always know which gen you're in before committing to a sleep strategy." },
  { cat:"STATUS",    text:"Spore from Parasect and Breloom has 100% accuracy for sleep. No other sleep move comes close. If you catch one, put them in your roster specifically for boss fights." },
  { cat:"STATUS",    text:"Toxic poison deals escalating damage each turn: 1/16, 2/16, 3/16... a Pokémon hit by Toxic is dead within 6-8 turns if not healed. Use it on tanky gym leaders with Milk Drink or Softboiled." },
  { cat:"STATUS",    text:"Freeze is random to inflict (Ice moves have 10% freeze chance) but lasts indefinitely until thawed. A frozen Pokémon is effectively removed from the fight. Blizzard in Hail is the most reliable freezer." },
  { cat:"STATUS",    text:"Burn halves physical Attack and deals 1/16 HP per turn (1/8 in Gen 6+). Will-O-Wisp any physical attacker you can't outspeed. Rotom, Mismagius, and Dusclops all learn it and can survive long enough to use it." },
  { cat:"STATUS",    text:"Yawn forces sleep next turn — not this turn. Use it when an enemy switches in, then swap to your damage dealer as they fall asleep. It bypasses Safeguard if the Yawn was used before the protect." },
  { cat:"STATUS",    text:"Confuse Ray + Paralysis (ConfuseParalysis) is a Gen 1-era strategy that reduces enemy action to around 37.5% chance of doing anything. Still viable against single dangerous threats in any gen." },
  { cat:"STATUS",    text:"Leech Seed siphons 1/8 HP per turn and transfers it to you. Against tanky Grass-weak opponents, Leech Seed + toxic is a passive kill that requires no direct damage and can win fights your team would normally lose." },

  // ── CLUTCH ITEM ROUTING ──
  { cat:"ITEMS",     text:"Never use your Revive mid-battle unless it's your last Pokémon. Revives in Nuzlockes raise a dead Pokémon, but that Pokémon is still dead by the rules. They're legitimately useless as combat items — save them to sell." },
  { cat:"ITEMS",     text:"X Speed + X Special in Gen 1 can turn any Pokémon into an unstoppable sweeper. X items stack multiplicatively and last the entire battle. Using two X Specials on your starter before the Elite Four is not cheese — it's resource management." },
  { cat:"ITEMS",     text:"Full Restores are worth hoarding for three specific moments: Cynthia (Gen 4), Steven/Wallace (Gen 3), and any double battle forced fight. Don't use them to recover from sloppy play earlier in a run." },
  { cat:"ITEMS",     text:"Lum Berry cures any status immediately when held. Against Morty, Clair, and other poison/sleep abusers, one Lum Berry on your lead avoids a run-ending status on turn 1." },
  { cat:"ITEMS",     text:"Sitrus Berry restores 25% HP when held. It's strictly better than Oran Berry mid-game. Any time you find one, put it on your most important team member before the next boss fight." },
  { cat:"ITEMS",     text:"The Amulet Coin doubles prize money. In a Nuzlocke you need heals. Money = heals. Equip it early and never take it off until you're flush with Full Restores." },
  { cat:"ITEMS",     text:"Scope Lens raises critical hit ratio. On high-crit moves like Slash, Night Slash, and Razor Leaf, it pushes crit rate to around 25%. On a Slash user, roughly 1 in 4 hits will do double damage." },
  { cat:"ITEMS",     text:"Shell Bell restores HP equal to 1/8 of damage dealt. On a high-damage sweeper, it can outpace chip damage from status or sand and effectively give you extra turns against stall teams." },
  { cat:"ITEMS",     text:"Escape Rope is one of the most undervalued items in Nuzlockes. One bad wild encounter deep in a cave with a weak lead can spiral. Keep two at all times. Never forget you have them." },

  // ── LEAD OPTIMIZATION ──
  { cat:"LEAD",      text:"Your lead in a boss fight should always be able to take at least one hit from the opponent's lead. A one-shot lead means you're immediately at a numbers disadvantage before you've even seen their team." },
  { cat:"LEAD",      text:"Roar and Whirlwind force switches on the enemy — they bypass Substitute, ignore accuracy checks, and cannot miss in Gen 3+. Use them to cycle through enemy AI teams before a boss and map their movesets." },
  { cat:"LEAD",      text:"False Swipe keeps wild Pokémon at 1 HP and never faints them. If you're trying to catch something specific, keeping a False Swipe user in your party removes the 'I accidentally fainted it' death spiral." },
  { cat:"LEAD",      text:"Taunt prevents status and support moves for 3 turns. Against Whitney (Attract + Rollout) or Clair (Safeguard + Thunder Wave), one Taunt user negates their entire strategy." },
  { cat:"LEAD",      text:"For Brock in Gen 1/3, any Pokémon with a Normal move is technically viable since his Pokémon can only use Rock and Normal types — the weakness system doesn't affect Normal attacks. The 'need Water/Grass' assumption is only true if you want a fast clear." },
  { cat:"LEAD",      text:"Intimidate activates on switch-in and lowers the enemy's Attack by one stage. Leading with an Intimidate user against physical sweepers — Luxray, Staraptor, Arcanine — buys you an extra hit before they KO you." },
  { cat:"LEAD",      text:"Sticky Web and Stealth Rock don't exist in early gens, but Thunder Wave on your lead effectively does the same job: neutering the enemy's Speed advantage before your slower team has to fight." },

  // ── SACRIFICE PLAYS & PIVOTS ──
  { cat:"SACRIFICE",  text:"A sacrifice play isn't a mistake — it's a resource trade. If your weakest Pokémon forces an enemy to burn a Full Restore, you traded a dead weight for an item. Calculate the trade before you write it off as a loss." },
  { cat:"SACRIFICE",  text:"U-turn and Volt Switch deal damage AND switch you out. They're the cleanest pivot tools in Nuzlockes — hit the enemy, bring in a safe switch, take no retaliation damage. Keep one on a fast Pokémon at all times." },
  { cat:"SACRIFICE",  text:"Memento drops the user's own stats to 0 and faints them, but halves the enemy's Attack and SpAtk. If a Pokémon is already doomed, Memento it first — that set-up win can let a sweeper solo what comes next." },
  { cat:"SACRIFICE",  text:"Destiny Bond faints both Pokémon when the user is KO'd. If you know you're going to lose a Pokémon anyway, Destiny Bond first. One for one against a trainer's ace is a massive value trade in a Nuzlocke." },
  { cat:"SACRIFICE",  text:"Healing Wish and Lunar Dance faint the user but fully restore the next Pokémon's HP and status. Latias, Lopunny, and Clefable all learn Healing Wish. Use a Pokémon you're about to box anyway." },
  { cat:"SACRIFICE",  text:"Pain Split averages both Pokémon's HP. Against a low-HP enemy, it drains you. Against a full-HP bulky enemy, it refills you to near-full. The best defensive pivot move against tanky boss Pokémon." },
  { cat:"SACRIFICE",  text:"Baton Pass transfers stat boosts to the next Pokémon. One Swords Dance or Calm Mind on a setup user, then Baton Pass out — your fragile sweeper comes in at +2 without having to set up themselves." },

  // ── GRINDING & LEVEL THRESHOLDS ──
  { cat:"GRINDING",  text:"Never be more than 5 levels below the gym leader's ace. At -5 levels, you're taking roughly 25-30% more damage per hit. At -8 levels, a two-hit KO becomes a one-hit KO on most matchups." },
  { cat:"GRINDING",  text:"The exp share in Gen 6+ splits exp across the entire party. Turn it off for boss fights — having an underlevelled Pokémon soak exp during a dangerous fight is worse than the gain. Level-gate your backliners deliberately." },
  { cat:"GRINDING",  text:"In Gen 2, the Day Care raises Pokémon by 1 level per step taken. You can passively grind while running errands. 1000 steps is roughly a level — deposit weak backliners and forget about them between major fights." },
  { cat:"GRINDING",  text:"The Vs. Seeker in Gen 3-4 lets you rematch trainers infinitely. The two trainers on the long route north of Pallet Town (FireRed) are the best early grind in the game — high levels, accessible early, no HMs needed." },
  { cat:"GRINDING",  text:"Lucky Egg gives 1.5× EXP to the holder. In Gen 5+, it's farmable from wild Chansey in the post-game. In Gen 4, Blissey can hold them. Even mid-run, a Lucky Egg holder can close a 10-level gap in one dungeon." },
  { cat:"GRINDING",  text:"Know your evolution level breakpoints. Haunter evolves by trade — if you can't trade, it stays Haunter forever. Plan your final team around evolutions that are achievable without external resources." },
  { cat:"GRINDING",  text:"The E4 rematch in Gen 4+ has significantly higher levels than the first clear. If you're grinding for the post-game champion rematch, expect levels 10-15 higher than your original clear fight." },
  { cat:"GRINDING",  text:"In Gen 5, Audino gives the most base EXP of any common wild Pokémon. Rustling grass always contains either an Audino or a rare Pokémon. In a Nuzlocke, rustle-spot encounters are your best grind spots from the beginning." },

  // ── DEEP POKÉDEX LORE ──
  { cat:"LORE",      text:"Gengar is canonically the shadow of a Clefable. They share identical base stat totals (600), near-identical weight, and have mirror-image body silhouettes." },
  { cat:"LORE",      text:"Spiritomb was imprisoned inside an Odd Keystone as punishment for 108 misdeeds. The number 108 appears in Buddhism as the number of earthly temptations — it is not a coincidence." },
  { cat:"LORE",      text:"Shedinja doesn't evolve from Nincada — it IS the shed exoskeleton. When Nincada evolves, the hollow shell becomes Shedinja if you have an empty party slot and a Poké Ball." },
  { cat:"LORE",      text:"Volcarona is described in the Pokédex as a substitute sun. Ancient people worshipped it during volcanic winters when ash blocked sunlight for years at a time." },
  { cat:"LORE",      text:"Alakazam's Pokédex entry claims an IQ exceeding 5,000 and perfect recall of every experience since birth. It cannot use its body freely because its muscles atrophied from pure brain growth." },
  { cat:"LORE",      text:"Hydreigon has three heads but only the central one has a brain. The arm-heads operate on pure instinct and cannot be controlled — which is why Hydreigon has no friends." },
  { cat:"LORE",      text:"Aegislash can take control of the weak-willed, and Pokédex entries across games describe it having guided entire kingdoms from behind the throne without a single king knowing." },
  { cat:"LORE",      text:"Cubone wears the skull of its deceased mother. The cries it makes at night, mistaken for its mother's voice, are actually the echoes bouncing inside the skull it wears." },
  { cat:"LORE",      text:"Gardevoir will create a micro black hole to protect its trainer. The entry says it warps space itself — which would technically destroy everything within several kilometers." },
  { cat:"LORE",      text:"Darkrai doesn't cause nightmares intentionally. It gives them involuntarily just by being nearby, which is why it lives alone on a tiny island to avoid hurting people." },
  { cat:"LORE",      text:"Tyranitar's body is stated to be so powerful that mountains crumble wherever it walks. Its presence shifts entire ecosystems — maps have to be redrawn after it migrates." },

  // ── GLITCHES AND TECH ──
  { cat:"TECH",      text:"The Missingno. encounter in Gen 1 is caused by the game reading your name as a species ID when it shouldn't. The letters of your name map to character codes that trigger wild encounters in undefined memory." },
  { cat:"TECH",      text:"In Gen 1, the Special stat controls both Special Attack and Special Defense. This means a Pokémon like Alakazam that sweeps also has a legitimately hard-to-break special defense — by design." },
  { cat:"TECH",      text:"Wrapping moves in Gen 1 don't just deal chip damage — they prevent the opponent from attacking for their duration. This was considered a top-tier competitive strategy and was later nerfed hard." },
  { cat:"TECH",      text:"In Gen 4, you can get a Pokémon with any moveset using the Cloning Glitch in the GTS. The glitch overwrites cartridge save data temporarily and can corrupt saves — it was patched but not before being widely exploited." },
  { cat:"TECH",      text:"HeartGold and SoulSilver secretly run two separate processors simultaneously — one for the Pokéwalker communication protocol and one for the main game. This is why the cartridges run slightly hotter than other DS games." },

  // ── CONSPIRACY TIER ──
  { cat:"LORE",      text:"Lavender Town's original BGM in the Japanese release had a higher-pitched, dissonant version. The Lavender Town Syndrome creepypasta claims it caused headaches in children — fabricated, but the music WAS changed between versions and the original IS measurably more abrasive." },
  { cat:"LORE",      text:"AZ's Floette in X/Y cannot be obtained legitimately. The data exists in the game with unique stats, but no event was ever distributed. Game Freak cited 'not wanting to make AZ's story feel less special' — the only time narrative reasons were given for withholding a Pokémon." },
  { cat:"LORE",      text:"In Scarlet and Violet, the professor who sends you emails is dead before the game begins. This is not ambiguous — the timeline makes it impossible for them to have survived. Every piece of dialogue takes on a different tone once you realise." },
];

let lastFactIndex = -1;
let activeFacCat = null;


function filterFact(cat, btn) {
  activeFacCat = cat;
  document.querySelectorAll('.fact-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  showFact(cat);
}

function showFact(forceCat) {
  const pool = forceCat
    ? FACTS.filter(f => f.cat === forceCat)
    : FACTS;
  if (!pool.length) return;
  let idx;
  do { idx = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && pool[idx] === FACTS[lastFactIndex]);
  const fact = pool[idx];
  lastFactIndex = FACTS.indexOf(fact);
  const el = document.getElementById('fact-text');
  const catEl = document.getElementById('fact-cat-label');
  if (catEl) catEl.textContent = fact.cat;
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = fact.text;
      el.style.opacity = '1';
    }, 200);
  }
}

// ─────────────────────────────────────────────
//  API HELPERS — wrappers around fetch()
// ─────────────────────────────────────────────

// These are small helper functions so we don't repeat ourselves.
// Instead of writing fetch(...) everywhere, we call api.get(), api.post(), etc.

const api = {
  get: (url) =>
    fetch(url).then(r => r.json()),

  post: (url, body) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(r => r.json()),

  patch: (url, body) =>
    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(r => r.json()),

  delete: (url) =>
    fetch(url, { method: 'DELETE' }).then(r => r.json()),
};


// ─────────────────────────────────────────────
//  RUNS
// ─────────────────────────────────────────────

// Populate the "Select a game" dropdown from GAME_DATA
function populateGameDropdown() {
  const sel = document.getElementById('new-run-input');
  getAllGames().forEach(name => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = name;
    sel.appendChild(opt);
  });
}

async function loadRuns() {
  const runs = await api.get('/api/runs');
  renderRunList(runs);
}

function renderRunList(runs) {
  const container = document.getElementById('run-list');
  if (!runs.length) {
    container.innerHTML = '<div class="empty-state">NO RUNS FOUND.<br/>CREATE ONE ABOVE.</div>';
    return;
  }

  // Group runs by game name
  const groups = {};
  runs.forEach(run => {
    if (!groups[run.game]) groups[run.game] = [];
    groups[run.game].push(run);
  });

  // Build one collapsible group per game
  let html = '';
  for (const [game, gameRuns] of Object.entries(groups)) {
    const hasActive = gameRuns.some(r => r.id === currentRunId);
    const runCount  = gameRuns.length;

    const runsHtml = gameRuns.map((run, idx) => {
      const statusColor = run.status === 'won'  ? 'var(--neon-yellow)'
                        : run.status === 'lost' ? 'var(--neon-red)'
                        : 'var(--neon-cyan)';
      return `<div class="run-item ${run.id === currentRunId ? 'active' : ''}" data-id="${run.id}">
        <div class="run-item-name">${escapeHtml(run.game)} <span class="run-number">#${idx + 1}</span></div>
        <div class="run-item-meta" style="color:${statusColor}">${run.status.toUpperCase()} · ${run.badges}/${getBadgeCount(run.game)} ✦</div>
      </div>`;
    }).join('');

    html += `<div class="run-group">
      <div class="run-group-header${hasActive ? ' has-active' : ''}" onclick="toggleGroup(this)">
        <span class="run-group-name">${escapeHtml(game)}</span>
        <div class="run-group-right">
          <span class="run-group-count">${runCount} RUN${runCount !== 1 ? 'S' : ''}</span>
          <button class="btn-delete-game" title="Delete all runs for this game"
            onclick="event.stopPropagation(); deleteGame(${JSON.stringify(game)})">✕</button>
        </div>
      </div>
      <div class="run-group-body${hasActive ? ' open' : ''}">${runsHtml}</div>
    </div>`;
  }

  container.innerHTML = html;
  container.querySelectorAll('.run-item').forEach(el => {
    el.addEventListener('click', () => selectRun(Number(el.dataset.id)));
  });
}

function toggleGroup(header) {
  header.nextElementSibling.classList.toggle('open');
}

async function createRun() {
  const input = document.getElementById('new-run-input');
  const game  = input.value;
  if (!game) return;
  await api.post('/api/runs', { game });
  input.value = '';
  await loadRuns();
}

async function selectRun(id) {
  currentRunId = id;
  const run   = await api.get(`/api/runs/${id}`);
  allPokemon  = await api.get(`/api/runs/${id}/pokemon`);

  document.getElementById('no-run-msg').classList.add('hidden');
  document.getElementById('run-detail').classList.remove('hidden');
  document.getElementById('hof-section').classList.add('hidden');

  updateActiveRunDisplay(run);
  document.getElementById('run-title-display').textContent    = run.game.toUpperCase();
  document.getElementById('run-title-display').dataset.game   = run.game;
  document.getElementById('run-date-display').textContent  =
    'STARTED ' + new Date(run.created_at).toLocaleDateString();
  document.getElementById('run-status-select').value = run.status;
  document.getElementById('notes-textarea').value    = run.notes || '';
  updateStatusBadge(run.status);
  const maxB = getBadgeCount(run.game);
  document.getElementById('badge-count').textContent = run.badges;
  document.querySelector('.badge-label').textContent  = `/ ${maxB}`;
  // Call after a microtask so run-detail is fully painted before pips inject
  requestAnimationFrame(() => updateBadgePips(run.badges, maxB));

  // Populate the location dropdown for this game
  populateLocationDropdown(run.game);

  initTeamBuilderFromParty();
  renderTeamBuilder();
  renderParty();
  renderBox();
  renderGraveyard();
  renderLog();
  renderRoutes();
  renderStats();
  renderGuide();
  await loadRuns();
}

async function deleteRun() {
  if (!currentRunId) return;
  if (!confirm('Delete this run? This cannot be undone.')) return;
  await api.delete(`/api/runs/${currentRunId}`);
  currentRunId = null;
  allPokemon   = [];
  updateActiveRunDisplay(null);
  document.getElementById('run-detail').classList.add('hidden');
  document.getElementById('no-run-msg').classList.remove('hidden');
  await loadRuns();
}

async function deleteGame(gameName) {
  if (!gameName) return;
  const runs = await api.get('/api/runs');
  const gameRuns = runs.filter(r => r.game === gameName);
  if (!gameRuns.length) return;
  if (!confirm(`Delete ALL ${gameRuns.length} run(s) for "${gameName}"? This cannot be undone.`)) return;
  for (const run of gameRuns) {
    await api.delete(`/api/runs/${run.id}`);
  }
  if (gameRuns.some(r => r.id === currentRunId)) {
    currentRunId = null;
    allPokemon   = [];
    document.getElementById('run-detail').classList.add('hidden');
    document.getElementById('no-run-msg').classList.remove('hidden');
  }
  await loadRuns();
}

async function updateRunStatus() {
  const status = document.getElementById('run-status-select').value;
  await api.patch(`/api/runs/${currentRunId}`, { status });
  updateStatusBadge(status);
  await loadRuns();
}

function updateStatusBadge(status) {
  const badge = document.getElementById('run-status-badge');
  badge.textContent = status.toUpperCase();
  badge.className   = `status-badge status-${status}`;
}

// ─────────────────────────────────────────────
//  DROPDOWN CASCADE — Location → Species
// ─────────────────────────────────────────────

// Fill the location dropdown with routes from the current game.
// Called when a run is selected.
function populateLocationDropdown(gameName) {
  const locSel = document.getElementById('add-location');
  locSel.innerHTML = '<option value="">— Route / Location —</option>';

  const routes = getRoutes(gameName);
  if (routes.length) {
    // Build a set of locations already used (pokemon caught there)
    const usedLocations = new Set(allPokemon.map(m => m.location).filter(Boolean));

    routes.forEach(r => {
      const opt  = document.createElement('option');
      const used = usedLocations.has(r.name);
      opt.value       = r.name;
      opt.textContent = used ? `✓ ${r.name}` : r.name;
      if (used) {
        opt.disabled = true;
        opt.style.color  = 'var(--text-dim)';
      }
      locSel.appendChild(opt);
    });
  } else {
    // Game not in our data yet — allow free-typing as fallback
    locSel.innerHTML = '';
    locSel.outerHTML = locSel.outerHTML.replace('<select', '<input type="text" placeholder="Route / Location"');
  }

  // Reset species dropdown
  populateSpeciesDropdown(gameName, '');
}

// Swap the level input between a <select> (when route has levels) and <input> (fallback)
function updateLevelInput(gameName, routeName) {
  const wrap  = document.getElementById('level-input-wrap');
  const levels = routeName ? getRouteLevels(gameName, routeName) : null;

  if (levels) {
    // Parse "12-18" or "5" into min/max
    const parts = levels.split('-').map(Number);
    const min   = parts[0];
    const max   = parts.length > 1 ? parts[1] : parts[0];

    let opts = '<option value="">Lv.</option>';
    for (let i = min; i <= max; i++) {
      opts += `<option value="${i}">${i}</option>`;
    }
    wrap.innerHTML = `<select class="input input-sm" id="add-level">${opts}</select>`;
  } else {
    wrap.innerHTML = '<input class="input input-sm" placeholder="Lv." id="add-level" type="number" min="1" max="100" />';
  }
}

// Fill the species dropdown.
// If a route is selected, show only that route's encounters.
// Otherwise show all unique Pokémon available in the game.
function populateSpeciesDropdown(gameName, routeName) {
  const specSel = document.getElementById('add-species');
  specSel.innerHTML = '<option value="">— Species —</option>';

  let list = [];
  if (routeName) {
    list = getEncounters(gameName, routeName);
  } else {
    // Flatten all encounters across all routes, deduplicate
    const all = getRoutes(gameName).flatMap(r => r.encounters);
    list = [...new Set(all)].sort();
  }

  list.forEach(name => {
    const opt = document.createElement('option');
    opt.value = opt.textContent = name;
    specSel.appendChild(opt);
  });
}


// ─────────────────────────────────────────────
//  BADGES
// ─────────────────────────────────────────────

async function changeBadges(delta) {
  const run      = await api.get(`/api/runs/${currentRunId}`);
  const maxBadge = getBadgeCount(currentGameName());
  const newCount = Math.max(0, Math.min(maxBadge, run.badges + delta));
  const updated  = await api.patch(`/api/runs/${currentRunId}`, { badges: newCount });
  document.getElementById('badge-count').textContent = updated.badges;
  document.querySelector('.badge-label').textContent  = `/ ${maxBadge}`;
  updateBadgePips(updated.badges, maxBadge);
  await loadRuns();
}

function updateBadgePips(count, maxBadges) {
  const total = maxBadges || getBadgeCount(currentGameName()) || 8;
  const pips  = document.getElementById('badge-pips');
  if (!pips) return;
  pips.innerHTML = Array.from({ length: total }, (_, i) =>
    `<div class="badge-pip ${i < count ? 'earned' : ''}"></div>`
  ).join('');
}


// ─────────────────────────────────────────────
//  POKÉMON — ADD / RENDER
// ─────────────────────────────────────────────

// Helper: get the actual game name for the current run
// We store it in a data attribute on the run title element
function currentGameName() {
  return document.getElementById('run-title-display').dataset.game || '';
}

async function addPokemon() {
  const species  = document.getElementById('add-species').value.trim();
  const nickname = document.getElementById('add-nickname').value.trim();
  const level    = Number(document.getElementById('add-level').value) || 1;
  const location = document.getElementById('add-location').value.trim();
  const status   = document.getElementById('add-status').value;

  if (!species) { alert('Please select a species!'); return; }

  const newMon = await api.post(`/api/runs/${currentRunId}/pokemon`, {
    species, nickname, level, location, status
  });

  allPokemon.push(newMon);
  initTeamBuilderFromParty();
  renderTeamBuilder();
  renderParty();
  renderBox();
  renderLog();
  renderRoutes();
  renderStats();

  // Refresh location dropdown to mark the just-used route as taken
  populateLocationDropdown(currentGameName());

  // Reset only nickname + level — keep route/species for quick re-entry on same route
  const nicknameEl = document.getElementById('add-nickname');
  nicknameEl.dataset.userEdited = '';
  document.getElementById('add-level').value = '';
  // Re-autofill nickname with current species so next add is still pre-filled
  const currentSpecies = document.getElementById('add-species').value;
  nicknameEl.value = currentSpecies || '';
}

// Filter allPokemon by status and render cards
function renderParty() {
  const party = allPokemon.filter(m => m.status === 'party');
  document.getElementById('party-list').innerHTML =
    party.length
      ? party.map(pokemonCardHTML).join('')
      : '<div class="empty-state">PARTY EMPTY.<br/>ADD A POKÉMON ABOVE.</div>';
  attachCardListeners('party-list');
}

function renderBox() {
  const box = allPokemon.filter(m => m.status === 'box');
  document.getElementById('box-list').innerHTML =
    box.length
      ? box.map(pokemonCardHTML).join('')
      : '<div class="empty-state">PC BOX IS EMPTY.</div>';
  attachCardListeners('box-list');
}

function renderGraveyard() {
  const dead = allPokemon.filter(m => m.status === 'dead');
  document.getElementById('graveyard-list').innerHTML =
    dead.length
      ? dead.map(pokemonCardHTML).join('')
      : '<div class="empty-state">NO FALLEN SOLDIERS YET.<br/>STAY STRONG, TRAINER.</div>';
  attachCardListeners('graveyard-list');
}

function renderLog() {
  const tbody = document.getElementById('log-tbody');
  if (!allPokemon.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-dim)">NO POKÉMON CAUGHT YET.</td></tr>';
    return;
  }

  tbody.innerHTML = allPokemon.map(m => `
    <tr>
      <td>${escapeHtml(m.species)}</td>
      <td>${escapeHtml(m.nickname || '—')}</td>
      <td>${escapeHtml(m.location || '—')}</td>
      <td>Lv.${m.level}</td>
      <td><span class="log-status ${m.status}">${m.status.toUpperCase()}</span></td>
    </tr>
  `).join('');
}

// Build the HTML string for one Pokémon card
function pokemonCardHTML(mon) {
  const nickname = mon.nickname
    ? `<div class="nickname">"${escapeHtml(mon.nickname)}"</div>`
    : '';
  const cause = mon.cause_of_death
    ? `<div class="cause-of-death">✝ ${escapeHtml(mon.cause_of_death)}</div>`
    : '';

  // Build the sprite URL directly — no async needed!
  // onerror fires if the GIF doesn't exist (e.g. fan-made species name)
  const sprite = `
    <div class="sprite-wrap">
      <img
        src="${spriteUrl(mon.species)}"
        alt="${escapeHtml(mon.species)}"
        class="sprite"
        onerror="onSpriteError(this)"
      />
    </div>`;

  // Type pills
  const types = (typeof getPokemonTypes !== 'undefined') ? getPokemonTypes(mon.species) : [];
  const typePills = types.map(t =>
    `<span class="type-pill" style="${typeStyle(t)}">${t.toUpperCase()}</span>`
  ).join('');
  const typeLine = types.length ? `<div class="type-pills">${typePills}</div>` : '';

  return `
    <div class="pokemon-card ${mon.status === 'dead' ? 'dead' : ''}" data-id="${mon.id}">
      ${sprite}
      <span class="card-level">LV.${mon.level}</span>
      <div class="species dex-link" onclick="event.stopPropagation();openDexFor('${mon.species.replace(/'/g, String.fromCharCode(39))}');" title="Open in Pokédex">${escapeHtml(mon.species)}</div>
      ${typeLine}
      ${nickname}
      <div class="card-meta">📍 ${escapeHtml(mon.location || 'Unknown')}</div>
      ${cause}
    </div>
  `;
}

function attachCardListeners(containerId) {
  document.getElementById(containerId).querySelectorAll('.pokemon-card').forEach(card => {
    card.addEventListener('click', () => openEditModal(Number(card.dataset.id)));
  });
}


// ─────────────────────────────────────────────
//  EDIT MODAL
// ─────────────────────────────────────────────

function openEditModal(monId) {
  const mon = allPokemon.find(m => m.id === monId);
  if (!mon) return;

  editingMonId = monId;

  document.getElementById('edit-species').value  = mon.species;
  document.getElementById('edit-nickname').value = mon.nickname || '';
  document.getElementById('edit-level').value    = mon.level;
  document.getElementById('edit-location').value = mon.location || '';
  document.getElementById('edit-status').value   = mon.status;
  document.getElementById('edit-cause').value    = mon.cause_of_death || '';

  document.getElementById('edit-modal').classList.remove('hidden');
}

function closeEditModal() {
  editingMonId = null;
  document.getElementById('edit-modal').classList.add('hidden');
}

async function saveEdit() {
  if (!editingMonId) return;

  const newStatus = document.getElementById('edit-status').value;
  // Capture badge count at time of death
  let badgesAtDeath = undefined;
  if (newStatus === 'dead') {
    const currentRun = await api.get(`/api/runs/${currentRunId}`);
    badgesAtDeath = currentRun.badges;
  }

  const updated = await api.patch(`/api/pokemon/${editingMonId}`, {
    species:         document.getElementById('edit-species').value.trim(),
    nickname:        document.getElementById('edit-nickname').value.trim(),
    level:           Number(document.getElementById('edit-level').value) || 1,
    location:        document.getElementById('edit-location').value.trim(),
    status:          newStatus,
    cause_of_death:  document.getElementById('edit-cause').value.trim(),
    ...(badgesAtDeath !== undefined && { badges_at_death: badgesAtDeath }),
  });

  // Replace the old entry in our local array
  const idx = allPokemon.findIndex(m => m.id === editingMonId);
  if (idx !== -1) allPokemon[idx] = updated;

  closeEditModal();
  initTeamBuilderFromParty();
  renderTeamBuilder();
  renderParty();
  renderBox();
  renderGraveyard();
  renderLog();
  renderRoutes();
  renderStats();
}

async function deleteMonFromModal() {
  if (!editingMonId) return;
  if (!confirm('Remove this Pokémon from the run?')) return;

  await api.delete(`/api/pokemon/${editingMonId}`);
  allPokemon = allPokemon.filter(m => m.id !== editingMonId);

  closeEditModal();
  initTeamBuilderFromParty();
  renderTeamBuilder();
  renderParty();
  renderBox();
  renderGraveyard();
  renderLog();
  renderRoutes();
  renderStats();
}
// ─────────────────────────────────────────────

async function renderRoutes() {
  const wrap     = document.getElementById('route-table-wrap');
  const gameName = currentGameName();
  const routes   = getRoutes(gameName);

  if (!routes.length) {
    wrap.innerHTML = '<div class="empty-state">NO ROUTE DATA FOR THIS GAME YET.</div>';
    return;
  }

  // Load skipped routes from the run object (stored as JSON array in skipped_routes field)
  const run = await api.get(`/api/runs/${currentRunId}`);
  const skipped = new Set(run.skipped_routes || []);

  // Build a map: location name → pokemon caught there
  const caughtMap = {};
  allPokemon.forEach(m => {
    if (m.location && !caughtMap[m.location]) {
      caughtMap[m.location] = m;
    }
  });

  const rows = routes.map(route => {
    const caught   = caughtMap[route.name];
    const isSkipped = skipped.has(route.name);
    const rowClass = caught ? 'route-row-caught' : isSkipped ? 'route-row-skipped' : 'route-row-open';

    // Highlight the caught species in the encounters list
    const encList = route.encounters.map(e =>
      caught && e === caught.species
        ? `<span class="enc-highlight">${escapeHtml(e)}</span>`
        : escapeHtml(e)
    ).join(', ');

    const levelStr = route.levels
      ? `<span class="route-levels">${escapeHtml(route.levels)}</span>`
      : `<span style="color:var(--text-dim);font-size:0.5rem">—</span>`;

    const caughtCell = caught
      ? `<span class="route-caught-info">${escapeHtml(caught.species)}</span>
         ${caught.nickname ? `<br/><span class="route-caught-nick">"${escapeHtml(caught.nickname)}"</span>` : ''}`
      : isSkipped
        ? `<span style="color:var(--neon-yellow);font-size:0.42rem">SKIPPED</span>`
        : `<span style="color:var(--text-dim)">—</span>`;

    const skipBtn = caught ? '' : isSkipped
      ? `<button class="btn-unskip" onclick="toggleSkipRoute('${escapeHtml(route.name).replace(/'/g,"\\'")}', false)">↩ UNDO</button>`
      : `<button class="btn-skip"   onclick="toggleSkipRoute('${escapeHtml(route.name).replace(/'/g,"\\'")}', true)">✕ SKIP</button>`;

    return `
      <tr class="${rowClass}">
        <td class="route-name">${escapeHtml(route.name)}</td>
        <td class="route-level-cell">${levelStr}</td>
        <td>${caughtCell}</td>
        <td class="route-encounters">${encList}</td>
        <td>${skipBtn}</td>
      </tr>`;
  }).join('');

  wrap.innerHTML = `
    <table class="route-table">
      <thead>
        <tr>
          <th>ROUTE</th>
          <th>LVL</th>
          <th>CAUGHT</th>
          <th>ENCOUNTERS</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

async function toggleSkipRoute(routeName, skip) {
  const run      = await api.get(`/api/runs/${currentRunId}`);
  const skipped  = new Set(run.skipped_routes || []);
  skip ? skipped.add(routeName) : skipped.delete(routeName);
  await api.patch(`/api/runs/${currentRunId}`, { skipped_routes: [...skipped] });
  renderRoutes();
}




// ─────────────────────────────────────────────
//  GYM GUIDE TAB
// ─────────────────────────────────────────────

function renderGuide() {
  const container = document.getElementById('tab-guide-content');
  if (!container) return;

  const gameName = currentGameName();
  const bosses   = (typeof GYM_DATA !== 'undefined') ? getBosses(gameName) : [];

  if (!bosses.length) {
    container.innerHTML = `<div class="panel"><div class="empty-state">NO GUIDE DATA FOR THIS GAME YET.</div></div>`;
    return;
  }

  const cards = bosses.map(boss => {
    const typeColor = (typeof TYPE_COLORS !== 'undefined' && TYPE_COLORS[boss.type])
      ? TYPE_COLORS[boss.type] : '#6a7090';

    const recPills = (boss.recommend || []).map(r => {
      const c = (typeof TYPE_COLORS !== 'undefined' && TYPE_COLORS[r]) ? TYPE_COLORS[r] : '#6a7090';
      return `<span class="guide-type-pill" style="background:${c}22;color:${c};border:1px solid ${c}55">${r.toUpperCase()}</span>`;
    }).join('');

    const teamRows = boss.team.map(mon => {
      const types  = (typeof getPokemonTypes !== 'undefined') ? getPokemonTypes(mon.species) : [];
      const tPills = types.map(t =>
        `<span class="type-pill" style="${typeStyle(t)}">${t.toUpperCase()}</span>`
      ).join('');

      return `
        <div class="guide-mon-row">
          <div class="guide-mon-sprite-wrap">
            <img src="${spriteUrl(mon.species)}" alt="${escapeHtml(mon.species)}"
                 class="guide-mon-sprite" onerror="onSpriteError(this)"/>
          </div>
          <div class="guide-mon-info">
            <div class="guide-mon-top">
              <span class="guide-mon-name">${escapeHtml(mon.species)}</span>
              <span class="guide-mon-level">LV.${mon.level}</span>
              ${tPills}
            </div>
            <div class="guide-mon-details">
              <span class="guide-detail-label">ABILITY</span>
              <span class="guide-detail-val">${escapeHtml(mon.ability)}</span>
              <span class="guide-detail-sep">·</span>
              <span class="guide-detail-label">HELD</span>
              <span class="guide-detail-val">${escapeHtml(mon.held)}</span>
            </div>
            <div class="guide-moves">
              ${mon.moves.map(m => `<span class="guide-move">${escapeHtml(m)}</span>`).join('')}
            </div>
          </div>
        </div>`;
    }).join('');

    const badgeLabel = boss.badge && boss.badge !== '—'
      ? `<span class="guide-badge-label">✦ ${escapeHtml(boss.badge)}</span>` : '';

    return `
      <div class="guide-boss-card">
        <div class="guide-boss-header" style="border-left-color:${typeColor}">
          <div class="guide-boss-left">
            <div class="guide-boss-name">${escapeHtml(boss.name)}</div>
            <div class="guide-boss-meta">
              <span class="guide-boss-title">${escapeHtml(boss.title)}</span>
              <span class="guide-boss-sep">·</span>
              <span class="guide-boss-loc">📍 ${escapeHtml(boss.location)}</span>
            </div>
          </div>
          <div class="guide-boss-right">
            ${badgeLabel}
            <div class="guide-recommend">
              <span class="guide-rec-label">USE</span>
              ${recPills}
            </div>
          </div>
        </div>
        <div class="guide-team">${teamRows}</div>
      </div>`;
  }).join('');

  container.innerHTML = `<div class="panel">
    <div class="panel-title"><span class="panel-icon">◈</span> GYM & BOSS GUIDE — ${escapeHtml(gameName)}</div>
    <div class="guide-boss-list">${cards}</div>
  </div>`;
}


// ─────────────────────────────────────────────
//  STATS TAB
// ─────────────────────────────────────────────

function renderStats() {
  const container = document.getElementById('tab-stats-content');
  if (!container) return;

  const dead    = allPokemon.filter(m => m.status === 'dead');
  const alive   = allPokemon.filter(m => m.status !== 'dead');
  const total   = allPokemon.length;
  const maxB    = getBadgeCount(currentGameName());

  // ── Summary bar ──
  const survivalRate = total > 0 ? Math.round((alive.length / total) * 100) : 0;
  const summaryHtml = `
    <div class="stats-summary">
      <div class="stat-box">
        <div class="stat-val">${total}</div>
        <div class="stat-lbl">TOTAL CAUGHT</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:var(--neon-cyan)">${alive.length}</div>
        <div class="stat-lbl">SURVIVING</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:var(--neon-red)">${dead.length}</div>
        <div class="stat-lbl">FALLEN</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:${survivalRate >= 70 ? 'var(--neon-cyan)' : survivalRate >= 40 ? 'var(--neon-yellow)' : 'var(--neon-red)'}">${survivalRate}%</div>
        <div class="stat-lbl">SURVIVAL RATE</div>
      </div>
    </div>`;

  // ── Death line graph ──
  // X axis: badge counts 0..maxB  Y axis: deaths at that badge
  const deathsByBadge = Array.from({ length: maxB + 1 }, () => []);
  dead.forEach(m => {
    const b = (m.badges_at_death !== undefined && m.badges_at_death !== null)
      ? Math.min(Math.max(0, Number(m.badges_at_death)), maxB)
      : 0;
    deathsByBadge[b].push(m);
  });

  const counts    = deathsByBadge.map(g => g.length);
  const maxDeaths = Math.max(1, ...counts);
  const svgW = 520, svgH = 160;
  const padL = 32, padB = 32, padT = 16, padR = 20;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const points = counts.map((c, i) => {
    const px = padL + (i / maxB) * chartW;
    const py = padT + chartH - (c / maxDeaths) * chartH;
    return { x: px, y: py, c, i };
  });

  // Smooth polyline path
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  // Fill area under line
  const fillPath = `${linePath} L${points[points.length-1].x.toFixed(1)},${(padT+chartH).toFixed(1)} L${padL},${(padT+chartH).toFixed(1)} Z`;

  const gridLines = [0, Math.ceil(maxDeaths/2), maxDeaths].map(v => {
    const y = padT + chartH - (v / maxDeaths) * chartH;
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${svgW-padR}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <text x="${padL-4}" y="${(y+3).toFixed(1)}" text-anchor="end" fill="#6a7090" font-size="8" font-family="'Share Tech Mono',monospace">${v}</text>`;
  }).join('');

  const xLabels = points.map(p =>
    `<text x="${p.x.toFixed(1)}" y="${(svgH-padB+14).toFixed(1)}" text-anchor="middle" fill="#6a7090" font-size="8" font-family="'Share Tech Mono',monospace">${p.i}</text>`
  ).join('');

  const dots = points.map(p => {
    const r     = p.c > 0 ? 6 : 4;
    const fill  = p.c > 0 ? '#ff2244' : 'rgba(255,34,68,0.15)';
    const stroke= p.c > 0 ? '#ff2244' : 'rgba(255,34,68,0.3)';
    const glow  = p.c > 0 ? `filter="url(#redglow)"` : '';
    const label = p.c > 0
      ? `<text x="${p.x.toFixed(1)}" y="${(p.y - 10).toFixed(1)}" text-anchor="middle" fill="#ff2244" font-size="10" font-family="'Share Tech Mono',monospace" font-weight="bold">${p.c}</text>`
      : '';
    return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" ${glow}/>${label}`;
  }).join('');

  const timelineHtml = dead.length === 0
    ? `<div class="stats-chart-wrap">
        <div class="stats-chart-label">DEATHS PER BADGE</div>
        <svg viewBox="0 0 ${svgW} ${svgH}" width="100%" preserveAspectRatio="xMinYMin meet" class="death-svg">
          <defs>
            <linearGradient id="fillgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#00ffcc" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="#00ffcc" stop-opacity="0.01"/>
            </linearGradient>
          </defs>
          <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+chartH}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <line x1="${padL}" y1="${padT+chartH}" x2="${svgW-padR}" y2="${padT+chartH}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          ${xLabels}
          <text x="${padL-4}" y="${(padT+chartH+3).toFixed(1)}" text-anchor="end" fill="#6a7090" font-size="8" font-family="'Share Tech Mono',monospace">0</text>
          ${points.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${(padT+chartH).toFixed(1)}" r="3" fill="rgba(0,255,204,0.3)"/>`).join('')}
          <text x="${svgW/2}" y="${svgH}" text-anchor="middle" fill="#6a7090" font-size="8" font-family="'Share Tech Mono',monospace">BADGES — NO DEATHS YET ✓</text>
        </svg>
      </div>`
    : `<div class="stats-chart-wrap">
        <div class="stats-chart-label">DEATHS PER BADGE</div>
        <svg viewBox="0 0 ${svgW} ${svgH}" width="100%" preserveAspectRatio="xMinYMin meet" class="death-svg">
          <defs>
            <filter id="redglow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="fillgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ff2244" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="#ff2244" stop-opacity="0.01"/>
            </linearGradient>
          </defs>
          ${gridLines}
          <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+chartH}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <line x1="${padL}" y1="${padT+chartH}" x2="${svgW-padR}" y2="${padT+chartH}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <path d="${fillPath}" fill="url(#fillgrad)"/>
          <path d="${linePath}" fill="none" stroke="#ff2244" stroke-width="2" stroke-linejoin="round" opacity="0.7"/>
          ${dots}
          ${xLabels}
          <text x="${svgW/2}" y="${svgH}" text-anchor="middle" fill="#6a7090" font-size="8" font-family="'Share Tech Mono',monospace">BADGES AT TIME OF DEATH</text>
        </svg>
      </div>`;

  // ── Fallen roster ──
  const fallenHtml = dead.length === 0 ? '' : `
    <div class="stats-section-title">⚔ FALLEN ROSTER</div>
    <div class="stats-fallen-list">
      ${dead.map(m => `
        <div class="stats-fallen-row">
          <img src="${spriteUrl(m.species)}" alt="${escapeHtml(m.species)}" class="stats-fallen-sprite" onerror="onSpriteError(this)"/>
          <div class="stats-fallen-info">
            <span class="stats-fallen-name">${escapeHtml(m.nickname || m.species)}</span>
            ${m.nickname ? `<span class="stats-fallen-species">${escapeHtml(m.species)}</span>` : ''}
          </div>
          <div class="stats-fallen-where">
            ${m.cause_of_death ? `<span class="stats-fallen-cause">✝ ${escapeHtml(m.cause_of_death)}</span>` : ''}
            <span class="stats-fallen-loc">📍 ${escapeHtml(m.location || '?')}</span>
          </div>
          <div class="stats-fallen-badge">
            ${m.badges_at_death !== undefined && m.badges_at_death !== null
              ? `<span style="color:var(--neon-yellow)">✦${m.badges_at_death}</span>`
              : ''}
          </div>
        </div>`).join('')}
    </div>`;

  container.innerHTML = `
    <div class="panel">
      <div class="panel-title"><span class="panel-icon">◈</span> RUN STATISTICS</div>
      ${summaryHtml}
      ${timelineHtml}
      ${fallenHtml}
    </div>`;
}


function showHallOfFame() {
  // Hide run detail + home screen, show HOF
  document.getElementById('no-run-msg').classList.add('hidden');
  document.getElementById('run-detail').classList.add('hidden');
  document.getElementById('hof-section').classList.remove('hidden');
  currentRunId = null;
  // Deselect any active run in sidebar
  document.querySelectorAll('.run-item').forEach(el => el.classList.remove('active'));
  renderHallOfFame();
}

async function renderHallOfFame() {
  const container = document.getElementById('hof-list');
  container.innerHTML = '<div class="hof-empty">LOADING...</div>';

  const allRuns = await api.get('/api/runs');
  const wonRuns = allRuns.filter(r => r.status === 'won');

  if (!wonRuns.length) {
    container.innerHTML = '<div class="hof-empty">NO COMPLETED RUNS YET.<br/><br/>WIN A NUZLOCKE TO ENTER THE HALL OF FAME.</div>';
    return;
  }

  // Fetch pokemon for each won run in parallel
  const runData = await Promise.all(
    wonRuns.map(async run => {
      const pokemon = await api.get(`/api/runs/${run.id}/pokemon`);
      return { run, pokemon };
    })
  );

  // Count how many times each game appears (for run numbering)
  const gameCount = {};

  container.innerHTML = runData.map(({ run, pokemon }) => {
    gameCount[run.game] = (gameCount[run.game] || 0) + 1;
    const runNum     = gameCount[run.game];
    const party      = pokemon.filter(m => m.status === 'party' || m.status === 'box');
    const deathCount = pokemon.filter(m => m.status === 'dead').length;
    const date       = new Date(run.created_at).toLocaleDateString();
    const notesSnip  = (run.notes || '').trim();

    const sprites = party.slice(0, 6).map(mon => `
      <div class="hof-sprite-wrap">
        <img
          src="${spriteUrl(mon.species)}"
          alt="${escapeHtml(mon.species)}"
          title="${escapeHtml(mon.nickname || mon.species)}"
          onerror="onSpriteError(this)"
        />
        <div class="hof-sprite-name">${escapeHtml(mon.nickname || mon.species)}</div>
      </div>`).join('');

    const badgePips = Array.from({ length: run.badges }, () =>
      '<div class="hof-pip"></div>'
    ).join('');
    const hofBadgePipsHtml = `<span class="hof-badge-pips">${badgePips}</span>`;

    return `
      <div class="hof-card">
        <div class="hof-card-top">
          <div>
            <div class="hof-game">${escapeHtml(run.game)} <span style="color:var(--text-dim)">#${runNum}</span></div>
            <div class="hof-meta">STARTED ${date}</div>
          </div>
          <span class="hof-won-badge">✦ WON</span>
        </div>
        <div class="hof-sprites">${sprites || '<span style="color:var(--text-dim);font-size:0.5rem">NO PARTY DATA</span>'}</div>
        <div class="hof-stats">
          <span>BADGES <span class="hof-stat-val">${run.badges}</span> ${hofBadgePipsHtml}</span>
          <span>DEATHS <span class="hof-stat-val" style="color:var(--neon-red)">${deathCount}</span></span>
          <span>CAUGHT <span class="hof-stat-val">${pokemon.length}</span></span>
        </div>
        ${notesSnip ? `<div class="hof-notes">${escapeHtml(notesSnip)}</div>` : ''}
      </div>`;
  }).join('');
}




async function saveNotes() {
  const notes = document.getElementById('notes-textarea').value;
  await api.patch(`/api/runs/${currentRunId}`, { notes });

  const msg = document.getElementById('notes-saved-msg');
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 2000);
}


// ─────────────────────────────────────────────
//  TABS
// ─────────────────────────────────────────────

function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-content').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
    panel.classList.toggle('hidden', panel.id !== `tab-${tabName}`);
  });
  // Re-render stats whenever the tab is opened so it's always current
  if (tabName === 'stats' && currentRunId) renderStats();
  if (tabName === 'party') renderTeamBuilder();
  if (tabName === 'guide' && currentRunId) renderGuide();
}


// ─────────────────────────────────────────────
//  SECURITY HELPER — prevents XSS
// ─────────────────────────────────────────────
// Never inject user text directly into innerHTML without escaping!
// This replaces special characters like < > & with safe versions.
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ─────────────────────────────────────────────
//  EVENT LISTENERS — wire everything up
// ─────────────────────────────────────────────

// ══════════════════════════════════════════════
//  TEAM BUILDER — inline in party tab
//  - 6 slots defaulting to current party
//  - Click slot → floating box picker panel
//  - Type coverage + weakness summary
// ══════════════════════════════════════════════

// Full Gen 1-9 type chart (attacker type → { defender type → multiplier })
const TYPE_CHART = {
  Normal:   { Rock:0.5, Ghost:0, Steel:0.5 },
  Fire:     { Fire:0.5, Water:0.5, Rock:0.5, Dragon:0.5, Grass:2, Ice:2, Bug:2, Steel:2 },
  Water:    { Water:0.5, Grass:0.5, Dragon:0.5, Fire:2, Ground:2, Rock:2 },
  Electric: { Electric:0.5, Grass:0.5, Dragon:0.5, Ground:0, Flying:2, Water:2 },
  Grass:    { Fire:0.5, Grass:0.5, Poison:0.5, Flying:0.5, Bug:0.5, Dragon:0.5, Steel:0.5, Water:2, Ground:2, Rock:2 },
  Ice:      { Water:0.5, Ice:0.5, Steel:0.5, Fire:0.5, Grass:2, Ground:2, Flying:2, Dragon:2 },
  Fighting: { Poison:0.5, Bug:0.5, Psychic:0.5, Flying:0.5, Fairy:0.5, Ghost:0, Normal:2, Ice:2, Rock:2, Dark:2, Steel:2 },
  Poison:   { Poison:0.5, Ground:0.5, Rock:0.5, Ghost:0.5, Steel:0, Grass:2, Fairy:2 },
  Ground:   { Grass:0.5, Bug:0.5, Flying:0, Electric:2, Fire:2, Poison:2, Rock:2, Steel:2 },
  Flying:   { Electric:0.5, Rock:0.5, Steel:0.5, Grass:2, Fighting:2, Bug:2 },
  Psychic:  { Psychic:0.5, Steel:0.5, Dark:0, Fighting:2, Poison:2 },
  Bug:      { Fire:0.5, Fighting:0.5, Flying:0.5, Ghost:0.5, Steel:0.5, Fairy:0.5, Grass:2, Psychic:2, Dark:2 },
  Rock:     { Fighting:0.5, Ground:0.5, Steel:0.5, Normal:2, Fire:2, Ice:2, Flying:2, Bug:2 },
  Ghost:    { Normal:0, Dark:0.5, Ghost:2, Psychic:2 },
  Dragon:   { Steel:0.5, Dragon:2, Fairy:0 },
  Dark:     { Fighting:0.5, Dark:0.5, Fairy:0.5, Ghost:2, Psychic:2 },
  Steel:    { Fire:0.5, Water:0.5, Electric:0.5, Steel:0.5, Normal:2, Ice:2, Rock:2, Fairy:2 },
  Fairy:    { Fire:0.5, Poison:0.5, Steel:0.5, Fighting:2, Dragon:2, Dark:2 },
};

const ALL_TYPES = Object.keys(TYPE_CHART);

// teamSlots[0..5] = species string or null
let teamSlots = [null,null,null,null,null,null];
let activeSlotIndex = -1;

function initTeamBuilderFromParty() {
  const party = allPokemon.filter(m => m.status === 'party').slice(0, 6);
  teamSlots = Array.from({ length: 6 }, (_, i) => party[i]?.species || null);
}

// ── Defensive coverage: for each of the 18 types, how many of our team are weak/resist/immune ──
function calcTeamDefense(slots) {
  const filled = slots.filter(Boolean);
  if (!filled.length) return {};
  const result = {};
  ALL_TYPES.forEach(atkType => {
    let totalMult = 0;
    filled.forEach(species => {
      const types = getPokemonTypes(species);
      let mult = 1;
      types.forEach(defType => {
        const row = TYPE_CHART[atkType] || {};
        if (row[defType] !== undefined) mult *= row[defType];
      });
      totalMult += mult;
    });
    result[atkType] = +(totalMult / filled.length).toFixed(2);
  });
  return result;
}

// ── Offensive coverage: unique types the team can hit super-effectively ──
function calcTeamOffense(slots) {
  const filled = slots.filter(Boolean);
  if (!filled.length) return { covered: [], uncovered: [] };
  const covered = new Set();
  filled.forEach(species => {
    const types = getPokemonTypes(species);
    types.forEach(atkType => {
      const row = TYPE_CHART[atkType] || {};
      Object.entries(row).forEach(([defType, mult]) => {
        if (mult === 2) covered.add(defType);
      });
    });
  });
  const uncovered = ALL_TYPES.filter(t => !covered.has(t));
  return { covered: [...covered], uncovered };
}

function renderTeamBuilder() {
  const container = document.getElementById('team-builder-panel');
  if (!container) return;

  const defense = calcTeamDefense(teamSlots);
  const { covered, uncovered } = calcTeamOffense(teamSlots);

  // ── 6 team slots ──
  const slotsHtml = teamSlots.map((species, i) => {
    const types = species ? getPokemonTypes(species) : [];
    const typePills = types.map(t =>
      `<span class="type-pill" style="${typeStyle(t)}">${t.toUpperCase()}</span>`
    ).join('');
    return `
      <div class="tb-slot ${activeSlotIndex === i ? 'tb-slot-active' : ''} ${!species ? 'tb-slot-empty' : ''}"
           onclick="openBoxPicker(${i})" title="Click to change">
        <div class="tb-slot-num">${i + 1}</div>
        ${species
          ? `<img src="${spriteUrl(species)}" alt="${escapeHtml(species)}" class="tb-sprite" onerror="onSpriteError(this)"/>
             <div class="tb-slot-name">${escapeHtml(species)}</div>
             <div class="tb-slot-types">${typePills}</div>
             <button class="tb-clear" onclick="event.stopPropagation();clearSlot(${i})" title="Remove">✕</button>`
          : `<div class="tb-slot-plus">+</div><div class="tb-slot-hint">PICK</div>`
        }
      </div>`;
  }).join('');

  // ── Defensive weaknesses summary ──
  const defRows = ALL_TYPES.map(t => {
    const avg = defense[t] ?? 1;
    const c = avg === 0   ? 'var(--neon-cyan)'
            : avg < 0.5   ? '#00e5ff'
            : avg < 1     ? '#4a7090'
            : avg === 1   ? 'var(--text-dim)'
            : avg < 2     ? 'var(--neon-yellow)'
            : 'var(--neon-red)';
    const label = avg === 0 ? 'IMM' : avg < 1 ? `×${avg}` : avg === 1 ? '—' : `×${avg}`;
    return `<div class="tb-def-row">
      <span class="tb-def-type" style="background:${TYPE_COLORS[t]}22;color:${TYPE_COLORS[t]};border:1px solid ${TYPE_COLORS[t]}44">${t.toUpperCase()}</span>
      <span class="tb-def-val" style="color:${c}">${label}</span>
    </div>`;
  }).join('');

  // ── Offensive gaps ──
  const gapPills = uncovered.length === 0
    ? `<span style="color:var(--neon-cyan);font-size:0.75rem">FULL COVERAGE ✓</span>`
    : uncovered.map(t =>
        `<span class="tb-gap-pill" style="background:${TYPE_COLORS[t]}22;color:${TYPE_COLORS[t]};border:1px solid ${TYPE_COLORS[t]}44">${t.toUpperCase()}</span>`
      ).join('');

  container.innerHTML = `
    <div class="panel">
      <div class="panel-title"><span class="panel-icon">◈</span> TEAM BUILDER</div>
      <div class="tb-slots">${slotsHtml}</div>
      <div class="tb-analysis">
        <div class="tb-section">
          <div class="tb-section-title">⚔ OFFENSIVE GAPS</div>
          <div class="tb-gaps">${gapPills}</div>
        </div>
        <div class="tb-section">
          <div class="tb-section-title">🛡 AVG DEFENSIVE EXPOSURE</div>
          <div class="tb-def-grid">${defRows}</div>
        </div>
      </div>
    </div>`;
}

function clearSlot(i) {
  teamSlots[i] = null;
  renderTeamBuilder();
}

function openBoxPicker(slotIndex) {
  activeSlotIndex = slotIndex;
  renderTeamBuilder(); // highlight active slot

  const allAvailable = allPokemon.filter(m => m.status !== 'dead');
  const overlay = document.getElementById('box-picker-overlay');
  const list    = document.getElementById('box-picker-list');

  list.innerHTML = allAvailable.length === 0
    ? '<div style="color:var(--text-dim);font-size:0.75rem;padding:1rem">NO POKÉMON AVAILABLE</div>'
    : allAvailable.map(mon => {
        const types = getPokemonTypes(mon.species);
        const pills = types.map(t =>
          `<span class="type-pill" style="${typeStyle(t)}">${t.toUpperCase()}</span>`
        ).join('');
        return `
          <div class="bp-mon-row" onclick="assignSlot(${slotIndex},'${escapeHtml(mon.species).replace(/'/g,"\\'")}')">
            <img src="${spriteUrl(mon.species)}" alt="" class="bp-sprite" onerror="onSpriteError(this)"/>
            <div class="bp-mon-info">
              <div class="bp-mon-name">${escapeHtml(mon.nickname || mon.species)}</div>
              <div class="bp-mon-sub">${mon.nickname ? escapeHtml(mon.species) + ' · ' : ''}LV.${mon.level} · ${mon.status.toUpperCase()}</div>
              <div class="bp-mon-types">${pills}</div>
            </div>
          </div>`;
      }).join('');

  overlay.classList.remove('hidden');
}

function assignSlot(i, species) {
  teamSlots[i] = species;
  activeSlotIndex = -1;
  closeBoxPicker();
  renderTeamBuilder();
}

function closeBoxPicker() {
  document.getElementById('box-picker-overlay')?.classList.add('hidden');
  activeSlotIndex = -1;
  renderTeamBuilder();
}

document.addEventListener('DOMContentLoaded', async () => {

  // Show a fun fact on load and wire up the refresh button
  showFact();
  initZoom();
  // Open runs drawer by default so runs are visible on load
  const initDrawer = document.getElementById('runs-drawer');
  const initToggle = document.getElementById('runs-drawer-toggle');
  if (initDrawer) { initDrawer.classList.add('open'); initToggle.classList.add('open'); }
  document.getElementById('fact-refresh').addEventListener('click', () => showFact(activeFacCat));

  // Fetch any custom games from the admin portal and merge into GAME_DATA
  // so admin-added games appear in the dropdown automatically
  try {
    const customData = await fetch('/api/gamedata').then(r => r.json());
    Object.assign(GAME_DATA, customData);
  } catch (e) {
    console.warn('Could not load custom game data:', e);
  }

  // Populate game dropdown from merged GAME_DATA
  populateGameDropdown();

  // Hall of Fame
  document.getElementById('hof-btn').addEventListener('click', showHallOfFame);

  // Runs
  document.getElementById('create-run-btn').addEventListener('click', createRun);
  document.getElementById('delete-run-btn').addEventListener('click', deleteRun);
  document.getElementById('run-status-select').addEventListener('change', updateRunStatus);

  // Badges
  document.getElementById('badge-minus').addEventListener('click', () => changeBadges(-1));
  document.getElementById('badge-plus').addEventListener('click',  () => changeBadges(+1));

  // Location dropdown → auto-fill species dropdown
  // When user picks a route, species narrows to that route's encounters
  document.getElementById('add-location').addEventListener('change', () => {
    const gameName  = currentGameName();
    const routeName = document.getElementById('add-location').value;
    populateSpeciesDropdown(gameName, routeName);
    // Clear autofill when route changes
    const nicknameEl = document.getElementById('add-nickname');
    if (!nicknameEl.dataset.userEdited) nicknameEl.value = '';
    // Swap level input for dropdown if route has level data
    updateLevelInput(gameName, routeName);
  });

  // Species dropdown → autofill nickname with species name
  document.getElementById('add-species').addEventListener('change', () => {
    const nicknameEl = document.getElementById('add-nickname');
    const species    = document.getElementById('add-species').value;
    if (!nicknameEl.dataset.userEdited) {
      nicknameEl.value = species;
    }
  });

  // Mark nickname as user-edited if they type manually; clear flag if they empty it
  document.getElementById('add-nickname').addEventListener('input', function() {
    this.dataset.userEdited = this.value ? '1' : '';
  });

  // Add Pokémon
  document.getElementById('add-pokemon-btn').addEventListener('click', addPokemon);

  // Notes
  document.getElementById('save-notes-btn').addEventListener('click', saveNotes);

  // Tabs
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Edit Modal
  document.getElementById('edit-save-btn').addEventListener('click', saveEdit);
  document.getElementById('edit-delete-btn').addEventListener('click', deleteMonFromModal);
  document.getElementById('edit-cancel-btn').addEventListener('click', closeEditModal);
  document.getElementById('edit-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeEditModal();
  });

  // Box picker overlay — close on background click
  document.getElementById('box-picker-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeBoxPicker();
  });

  // Close dex on backdrop click
  document.getElementById('dex-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) toggleDex();
  });

  document.getElementById('calc-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) toggleCalc();
  });

  loadRuns();
});