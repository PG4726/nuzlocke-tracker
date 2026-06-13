// db.js — JSON File Database (no native dependencies needed!)
//
// Instead of SQLite, we store all data in a plain JSON file: nuzlocke.db.json
// Node.js can read/write files natively, so no packages needed at all.
//
// Structure of the JSON file:
// {
//   "runs": [ { id, game, status, badges, notes, created_at }, ... ],
//   "pokemon": [ { id, run_id, species, nickname, ... }, ... ]
// }

const fs   = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'nuzlocke.db.json');

// Default empty database structure
const EMPTY_DB = { runs: [], pokemon: [] };

// ── READ: Load the JSON file from disk ──
function read() {
  if (!fs.existsSync(DB_FILE)) {
    write(EMPTY_DB);
    return EMPTY_DB;
  }
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw);
}

// ── WRITE: Save the whole database back to disk ──
function write(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ── ID GENERATOR: Find the highest existing ID and add 1 ──
function nextId(items) {
  if (!items.length) return 1;
  return Math.max(...items.map(i => i.id)) + 1;
}

function now() { return new Date().toISOString(); }

// ─────────────────────────────────────────────
//  RUNS
// ─────────────────────────────────────────────

function getAllRuns() {
  const db = read();
  return [...db.runs].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

function getRunById(id) {
  return read().runs.find(r => r.id === id) || null;
}

function createRun(game) {
  const db  = read();
  const run = { id: nextId(db.runs), game, status: 'active', badges: 0, notes: '', created_at: now() };
  db.runs.push(run);
  write(db);
  return run;
}

function updateRun(id, fields) {
  const db  = read();
  const idx = db.runs.findIndex(r => r.id === id);
  if (idx === -1) return null;
  db.runs[idx] = { ...db.runs[idx], ...fields };
  write(db);
  return db.runs[idx];
}

function deleteRun(id) {
  const db = read();
  const before = db.runs.length;
  db.runs    = db.runs.filter(r => r.id !== id);
  db.pokemon = db.pokemon.filter(p => p.run_id !== id);
  write(db);
  return db.runs.length < before;
}

// ─────────────────────────────────────────────
//  POKEMON
// ─────────────────────────────────────────────

function getPokemonByRun(runId) {
  return read().pokemon.filter(p => p.run_id === runId);
}

function createPokemon(runId, fields) {
  const db  = read();
  const mon = {
    id: nextId(db.pokemon), run_id: runId,
    species: fields.species, nickname: fields.nickname || '',
    level: fields.level || 1, location: fields.location || '',
    status: fields.status || 'party', cause_of_death: '', caught_at: now(),
  };
  db.pokemon.push(mon);
  write(db);
  return mon;
}

function updatePokemon(id, fields) {
  const db  = read();
  const idx = db.pokemon.findIndex(p => p.id === id);
  if (idx === -1) return null;
  db.pokemon[idx] = { ...db.pokemon[idx], ...fields };
  write(db);
  return db.pokemon[idx];
}

function deletePokemon(id) {
  const db = read();
  const before = db.pokemon.length;
  db.pokemon = db.pokemon.filter(p => p.id !== id);
  write(db);
  return db.pokemon.length < before;
}

module.exports = {
  getAllRuns, getRunById, createRun, updateRun, deleteRun,
  getPokemonByRun, createPokemon, updatePokemon, deletePokemon,
};