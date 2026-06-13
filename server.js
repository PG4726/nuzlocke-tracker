// server.js — The Backend Server
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const db      = require('./db');

const app  = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─────────────────────────────────────────────
//  CUSTOM GAME DATA — stored in gamedata-custom.json
//  This is separate from the hardcoded Gen 1 data in gamedata.js.
//  The admin portal reads/writes this file.
//  The tracker merges both on load.
// ─────────────────────────────────────────────

const CUSTOM_DATA_FILE = path.join(__dirname, 'gamedata-custom.json');

function readCustomData() {
  if (!fs.existsSync(CUSTOM_DATA_FILE)) {
    fs.writeFileSync(CUSTOM_DATA_FILE, JSON.stringify({}, null, 2));
    return {};
  }
  return JSON.parse(fs.readFileSync(CUSTOM_DATA_FILE, 'utf-8'));
}

function writeCustomData(data) {
  fs.writeFileSync(CUSTOM_DATA_FILE, JSON.stringify(data, null, 2));
}

// GET /api/gamedata — return all custom games (merged by app.js with built-in data)
app.get('/api/gamedata', (req, res) => {
  res.json(readCustomData());
});

// POST /api/admin/games — add a new custom game
// Body: { name: "Pokémon Emerald", badgeCount: 8 }
app.post('/api/admin/games', (req, res) => {
  const { name, badgeCount } = req.body;
  if (!name) return res.status(400).json({ error: 'Game name required' });
  const data = readCustomData();
  if (data[name]) return res.status(400).json({ error: 'Game already exists' });
  data[name] = { badgeCount: badgeCount || 8, routes: [] };
  writeCustomData(data);
  res.status(201).json({ success: true, game: name });
});

// DELETE /api/admin/games/:name — remove a custom game
app.delete('/api/admin/games/:name', (req, res) => {
  const data = readCustomData();
  const name = decodeURIComponent(req.params.name);
  if (!data[name]) return res.status(404).json({ error: 'Game not found' });
  delete data[name];
  writeCustomData(data);
  res.json({ success: true });
});

// POST /api/admin/games/:name/routes — add a route to a custom game
// Body: { routeName: "Route 101", encounters: ["Zigzagoon", "Wurmple"] }
app.post('/api/admin/games/:name/routes', (req, res) => {
  const data      = readCustomData();
  const gameName  = decodeURIComponent(req.params.name);
  const { routeName, encounters } = req.body;
  if (!data[gameName]) return res.status(404).json({ error: 'Game not found' });
  if (!routeName)      return res.status(400).json({ error: 'Route name required' });
  const exists = data[gameName].routes.find(r => r.name === routeName);
  if (exists) return res.status(400).json({ error: 'Route already exists' });
  data[gameName].routes.push({ name: routeName, encounters: encounters || [] });
  writeCustomData(data);
  res.status(201).json({ success: true });
});

// PATCH /api/admin/games/:name/routes/:route — update a route's encounters
app.patch('/api/admin/games/:name/routes/:route', (req, res) => {
  const data      = readCustomData();
  const gameName  = decodeURIComponent(req.params.name);
  const routeName = decodeURIComponent(req.params.route);
  const { encounters } = req.body;
  if (!data[gameName]) return res.status(404).json({ error: 'Game not found' });
  const route = data[gameName].routes.find(r => r.name === routeName);
  if (!route) return res.status(404).json({ error: 'Route not found' });
  route.encounters = encounters || [];
  writeCustomData(data);
  res.json({ success: true });
});

// DELETE /api/admin/games/:name/routes/:route — remove a route
app.delete('/api/admin/games/:name/routes/:route', (req, res) => {
  const data      = readCustomData();
  const gameName  = decodeURIComponent(req.params.name);
  const routeName = decodeURIComponent(req.params.route);
  if (!data[gameName]) return res.status(404).json({ error: 'Game not found' });
  data[gameName].routes = data[gameName].routes.filter(r => r.name !== routeName);
  writeCustomData(data);
  res.json({ success: true });
});

// ─────────────────────────────────────────────
//  RUNS
// ─────────────────────────────────────────────
app.get('/api/runs',       (req, res) => res.json(db.getAllRuns()));
app.get('/api/runs/:id',   (req, res) => {
  const run = db.getRunById(Number(req.params.id));
  if (!run) return res.status(404).json({ error: 'Run not found' });
  res.json(run);
});
app.post('/api/runs', (req, res) => {
  const { game } = req.body;
  if (!game) return res.status(400).json({ error: 'Game name is required' });
  res.status(201).json(db.createRun(game));
});
app.patch('/api/runs/:id', (req, res) => {
  const updated = db.updateRun(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: 'Run not found' });
  res.json(updated);
});
app.delete('/api/runs/:id', (req, res) => {
  const ok = db.deleteRun(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: 'Run not found' });
  res.json({ success: true });
});

// ─────────────────────────────────────────────
//  POKEMON
// ─────────────────────────────────────────────
app.get('/api/runs/:id/pokemon', (req, res) =>
  res.json(db.getPokemonByRun(Number(req.params.id)))
);
app.post('/api/runs/:id/pokemon', (req, res) => {
  if (!req.body.species) return res.status(400).json({ error: 'Species is required' });
  res.status(201).json(db.createPokemon(Number(req.params.id), req.body));
});
app.patch('/api/pokemon/:id', (req, res) => {
  const updated = db.updatePokemon(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: 'Pokemon not found' });
  res.json(updated);
});
app.delete('/api/pokemon/:id', (req, res) => {
  const ok = db.deletePokemon(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: 'Pokemon not found' });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║   NUZLOCKE TRACKER SERVER ONLINE     ║
  ║   http://localhost:${PORT}           ║
  ║ ADMIN: http://localhost:${PORT}/admin║
  ╚══════════════════════════════════════╝
  `);
});