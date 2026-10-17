const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const { createClient } = require('@libsql/client');

const app = express();
app.disable('x-powered-by');
const port = 3000;
const dataDirectory = path.join(__dirname, 'data');
const teamsFile = path.join(dataDirectory, 'teams.json');
const coachesFile = path.join(dataDirectory, 'coaches.json');
const refereesFile = path.join(dataDirectory, 'referees.json');
const cardsFile = path.join(dataDirectory, 'cards.json');
const facilitiesFile = path.join(dataDirectory, 'facilities.json');
const matchesFile = path.join(dataDirectory, 'matches.json');
const stadiumsFile = path.join(dataDirectory, 'stadiums.json');
const scorersFile = path.join(dataDirectory, 'scorers.json');
const databaseFile = path.join(dataDirectory, 'footboard.sqlite');
const isServerless = require.main !== module;
if (!isServerless) fs.mkdirSync(dataDirectory, { recursive: true });
const databaseUrl = isServerless
  ? process.env.TURSO_DATABASE_URL || process.env.LIBSQL_URL
  : `file:${databaseFile}`;
const databaseAuthToken = isServerless
  ? process.env.TURSO_AUTH_TOKEN || process.env.LIBSQL_AUTH_TOKEN
  : undefined;
const database = createClient({
  url: databaseUrl || 'file::memory:',
  ...(databaseAuthToken ? { authToken: databaseAuthToken } : {})
});
let databaseInitialization;

async function execute(sql, args = []) {
  return database.execute({ sql, args });
}

async function getRow(sql, args = []) {
  const result = await execute(sql, args);
  return result.rows[0] || null;
}

async function getRows(sql, args = []) {
  const result = await execute(sql, args);
  return result.rows;
}

async function ensureUsersTableSchema() {
  const tableInfo = await getRows('PRAGMA table_info(users)');
  if (tableInfo.length === 0) return;
  const idColumn = tableInfo.find((column) => column.name === 'id');
  if (!idColumn || idColumn.type && idColumn.type.toUpperCase() === 'TEXT') return;

  await database.batch([
    'DROP TABLE IF EXISTS users_legacy_migration',
    'ALTER TABLE users RENAME TO users_legacy_migration',
    `CREATE TABLE users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    'INSERT INTO users (id, name, email, password_hash, created_at) SELECT CAST(id AS TEXT), name, email, password_hash, created_at FROM users_legacy_migration',
    'DROP TABLE users_legacy_migration'
  ], 'write');
}

const JWT_SECRET = process.env.JWT_SECRET || (isServerless ? crypto.randomBytes(32).toString('hex') : 'footboard-dev-secret-change-me');
const hasPersistentDeploymentConfig = Boolean(databaseUrl && databaseAuthToken && process.env.JWT_SECRET);

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password, storedHash) {
  if (typeof storedHash !== 'string' || !storedHash.includes(':')) return false;
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derived, 'hex'));
}

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '12h' });
}

function getUserFromToken(token) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email
    };
  } catch (error) {
    return null;
  }
}

async function requireAuth(request, response, next) {
  const authHeader = request.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  const user = getUserFromToken(token);
  if (!user || !await readUserById(user.id)) {
    return response.status(401).json({ error: 'Authentification requise.' });
  }
  request.user = user;
  return next();
}

async function readUserByEmail(email) {
  return getRow('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email.toLowerCase()]);
}

async function readUserById(id) {
  return getRow('SELECT id, name, email FROM users WHERE id = ?', [id]);
}

const defaultTeams = [
  { name: 'Real Madrid', short: 'RMA', logo: 'logo-r', played: 7, wins: 5, draws: 1, losses: 1, diff: '+9', points: 16 },
  { name: 'FC Barcelona', short: 'FCB', logo: 'logo-u', played: 7, wins: 4, draws: 2, losses: 1, diff: '+6', points: 14 },
  { name: 'Manchester United', short: 'MUN', logo: 'logo-m', played: 7, wins: 3, draws: 2, losses: 2, diff: '+2', points: 11 },
  { name: 'Liverpool FC', short: 'LIV', logo: 'logo-o', played: 7, wins: 2, draws: 1, losses: 4, diff: '-3', points: 7 }
];
const defaultMatches = [
  { id: 'fixture-rc-fm-2026-09-26', dateISO: '2026-09-26', home: 'Real Madrid', away: 'Manchester United', status: '18:30', type: 'today' },
  { id: 'fixture-us-on-2026-10-03', dateISO: '2026-10-03', home: 'FC Barcelona', away: 'Liverpool FC', status: '16:00', type: 'week' },
  { id: 'fixture-fm-us-2026-10-04', dateISO: '2026-10-04', home: 'Manchester United', away: 'FC Barcelona', status: '15:00', type: 'week' }
];
const defaultScorers = [
  { initials: 'KM', name: 'Karim Mansouri', team: 'Real Madrid', goals: 8 },
  { initials: 'LM', name: 'Lucas Martin', team: 'FC Barcelona', goals: 6 },
  { initials: 'AD', name: 'Amine Diallo', team: 'Manchester United', goals: 5 },
  { initials: 'TB', name: 'Thomas Bernard', team: 'Liverpool FC', goals: 4 }
];
const defaultCoaches = [
  { name: 'Nabil Bensaïd', team: 'Real Madrid' },
  { name: 'Sophie Laurent', team: 'FC Barcelona' },
  { name: 'Omar Haddad', team: 'Manchester United' },
  { name: 'Claire Moreau', team: 'Liverpool FC' }
];
const defaultReferees = [
  { name: 'Hugo Bernard', level: 'Fédéral 1' },
  { name: 'Lina Robert', level: 'Fédéral 1' },
  { name: 'Marc Diallo', level: 'Régional' }
];
const defaultStadiums = [
  { name: 'Stade du 11 Novembre', city: 'Rabat', capacity: 45000, availability: 'available' },
  { name: 'Complexe sportif', city: 'Casablanca', capacity: 32000, availability: 'available' },
  { name: 'Stade municipal', city: 'Tanger', capacity: 28000, availability: 'maintenance' }
];
const defaultFacilities = [
  { name: 'Terrain annexe A', type: 'Terrain', location: 'Stade du 11 Novembre', availability: 'available' },
  { name: 'Vestiaires principaux', type: 'Vestiaires', location: 'Complexe sportif', availability: 'available' }
];
const defaultCards = [
  { team: 'Real Madrid', yellow: 5, red: 1 },
  { team: 'FC Barcelona', yellow: 4, red: 1 },
  { team: 'Manchester United', yellow: 6, red: 2 },
  { team: 'Liverpool FC', yellow: 3, red: 0 }
];

app.use(express.json());
app.use(async (request, response, next) => {
  if (!request.path.startsWith('/api')) return next();
  try {
    await ensureDatabaseReady();
    return next();
  } catch (error) {
    return next(error);
  }
});
app.use((request, response, next) => {
  if (/^\/(data|scripts)(\/|$)/.test(request.path) || /^\/(server\.js|package(?:-lock)?\.json|README\.md)$/.test(request.path)) {
    return response.sendStatus(404);
  }
  return next();
});
app.use(express.static(__dirname, { dotfiles: 'deny', index: false }));
app.get('/ouvrage.html', (request, response, next) => {
  response.sendFile(path.join(__dirname, 'ouvrage.html'), (error) => {
    if (error) next(error);
  });
});
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'ouvrage.html'), (error) => {
    if (error) next(error);
  });
});

async function readCollection(collection) {
  const rows = await getRows('SELECT payload FROM records WHERE collection = ? ORDER BY position', [collection]);
  return rows.map((row) => JSON.parse(row.payload));
}

async function writeCollection(collection, records) {
  const statements = [
    { sql: 'INSERT OR IGNORE INTO collections (name) VALUES (?)', args: [collection] },
    { sql: 'DELETE FROM records WHERE collection = ?', args: [collection] },
    ...records.map((record, position) => ({
      sql: 'INSERT INTO records (collection, record_id, position, payload) VALUES (?, ?, ?, ?)',
      args: [collection, String(record.id ?? record.name ?? record.team ?? position), position, JSON.stringify(record)]
    }))
  ];
  await database.batch(statements, 'write');
}

async function initializeDatabase() {
  await database.batch([
    `CREATE TABLE IF NOT EXISTS collections (
      name TEXT PRIMARY KEY,
      initialized_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS records (
      collection TEXT NOT NULL,
      record_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      payload TEXT NOT NULL,
      PRIMARY KEY (collection, record_id),
      FOREIGN KEY (collection) REFERENCES collections(name) ON DELETE CASCADE
    )`,
    'CREATE INDEX IF NOT EXISTS records_collection_position ON records(collection, position)',
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
  ], 'write');
  await ensureUsersTableSchema();
  const seedCollections = [
    ['teams', defaultTeams, teamsFile],
    ['matches', defaultMatches, matchesFile],
    ['scorers', defaultScorers, scorersFile],
    ['coaches', defaultCoaches, coachesFile],
    ['referees', defaultReferees, refereesFile],
    ['stadiums', defaultStadiums, stadiumsFile],
    ['facilities', defaultFacilities, facilitiesFile],
    ['cards', defaultCards, cardsFile]
  ];
  const hasAnyCollection = await getRow('SELECT 1 FROM collections LIMIT 1');
  if (!hasAnyCollection) {
    await execute('INSERT OR IGNORE INTO collections (name) VALUES (?)', ['migration:legacy-json:v1']);
  }
  for (const [collection, defaults, legacyFile] of seedCollections) {
    if (await getRow('SELECT 1 FROM collections WHERE name = ?', [collection])) continue;
    let records = defaults;
    if (hasAnyCollection && fs.existsSync(legacyFile)) {
      const legacyData = JSON.parse(fs.readFileSync(legacyFile, 'utf8'));
      if (!Array.isArray(legacyData)) throw new Error(`Le fichier ${path.basename(legacyFile)} doit contenir une liste JSON.`);
      records = legacyData;
    }
    await writeCollection(collection, records);
  }
  await migrateLegacyClubNames();
}

function readTeams() { return readCollection('teams'); }
function writeTeams(teams) { return writeCollection('teams', teams); }
function readMatches() { return readCollection('matches'); }
function writeMatches(matches) { return writeCollection('matches', matches); }
function readScorers() { return readCollection('scorers'); }
function readCoaches() { return readCollection('coaches'); }
function writeCoaches(coaches) { return writeCollection('coaches', coaches); }
function readReferees() { return readCollection('referees'); }
function writeReferees(referees) { return writeCollection('referees', referees); }
function readStadiums() { return readCollection('stadiums'); }
function writeStadiums(stadiums) { return writeCollection('stadiums', stadiums); }
function readFacilities() { return readCollection('facilities'); }
function writeFacilities(facilities) { return writeCollection('facilities', facilities); }
function readCards() { return readCollection('cards'); }
function writeCards(cards) { return writeCollection('cards', cards); }

function applyMatchStats(teams, match, homeScore, awayScore, direction) {
  const home = teams.find((team) => team.name === match.home);
  const away = teams.find((team) => team.name === match.away);
  if (!home || !away) return false;
  home.played = Number(home.played || 0) + direction;
  away.played = Number(away.played || 0) + direction;
  home.diff = String((Number.parseInt(home.diff, 10) || 0) + (homeScore - awayScore) * direction);
  away.diff = String((Number.parseInt(away.diff, 10) || 0) + (awayScore - homeScore) * direction);
  if (homeScore > awayScore) {
    home.wins = Number(home.wins || 0) + direction;
    away.losses = Number(away.losses || 0) + direction;
    home.points = Number(home.points || 0) + 3 * direction;
  } else if (homeScore < awayScore) {
    away.wins = Number(away.wins || 0) + direction;
    home.losses = Number(home.losses || 0) + direction;
    away.points = Number(away.points || 0) + 3 * direction;
  } else {
    home.draws = Number(home.draws || 0) + direction;
    away.draws = Number(away.draws || 0) + direction;
    home.points = Number(home.points || 0) + direction;
    away.points = Number(away.points || 0) + direction;
  }
  return true;
}

function sortTeamsByRanking(teams) {
  return [...teams].sort((firstTeam, secondTeam) => {
    const pointsDifference = Number(secondTeam.points || 0) - Number(firstTeam.points || 0);
    if (pointsDifference) return pointsDifference;
    const goalDifference = Number.parseInt(secondTeam.diff, 10) - Number.parseInt(firstTeam.diff, 10);
    if (goalDifference) return goalDifference;
    const winsDifference = Number(secondTeam.wins || 0) - Number(firstTeam.wins || 0);
    if (winsDifference) return winsDifference;
    return firstTeam.name.localeCompare(secondTeam.name, 'fr');
  });
}

function sortScorersByRanking(scorers) {
  return [...scorers].sort((firstPlayer, secondPlayer) => secondPlayer.goals - firstPlayer.goals || firstPlayer.name.localeCompare(secondPlayer.name, 'fr'));
}

function ensureDatabaseReady() {
  if (!databaseInitialization) databaseInitialization = initializeDatabase();
  return databaseInitialization;
}

async function migrateLegacyClubNames() {
  const nameMap = {
    'Racing Club': 'Real Madrid',
    'Union Sportive': 'FC Barcelona',
    'FC Montreuil': 'Manchester United',
    'Olympique Nord': 'Liverpool FC'
  };
  const teamMetadata = {
    'Real Madrid': { short: 'RMA', logo: 'logo-r' },
    'FC Barcelona': { short: 'FCB', logo: 'logo-u' },
    'Manchester United': { short: 'MUN', logo: 'logo-m' },
    'Liverpool FC': { short: 'LIV', logo: 'logo-o' }
  };
  const collectionRows = await getRows('SELECT name FROM collections');
  const collections = collectionRows.map((row) => row.name).filter((name) => !name.startsWith('migration:'));
  for (const collection of collections) {
    const records = await readCollection(collection);
    let changed = false;
    for (const record of records) {
      for (const field of ['name', 'team', 'home', 'away']) {
        if (nameMap[record[field]]) {
          record[field] = nameMap[record[field]];
          changed = true;
        }
      }
      if (collection === 'teams' && teamMetadata[record.name]) {
        const metadata = teamMetadata[record.name];
        if (record.short !== metadata.short || record.logo !== metadata.logo) {
          Object.assign(record, metadata);
          changed = true;
        }
      }
    }
    if (changed) await writeCollection(collection, records);
  }
}

app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    service: 'footboard-api',
    persistentStorage: !isServerless || hasPersistentDeploymentConfig
  });
});

app.post('/api/auth/register', async (request, response) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const email = typeof request.body.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const password = typeof request.body.password === 'string' ? request.body.password : '';

  if (!name || name.length < 2) {
    return response.status(400).json({ error: 'Le nom doit contenir au moins 2 caractères.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ error: 'Une adresse e-mail valide est requise.' });
  }
  if (password.length < 6) {
    return response.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
  }

  if (await readUserByEmail(email)) {
    return response.status(409).json({ error: 'Un compte existe déjà pour cette adresse e-mail.' });
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password_hash: hashPassword(password)
  };

  await execute('INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)', [user.id, user.name, user.email, user.password_hash]);
  const token = signToken(user);
  return response.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/auth/login', async (request, response) => {
  const email = typeof request.body.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const password = typeof request.body.password === 'string' ? request.body.password : '';

  const user = await readUserByEmail(email);
  if (!user || !verifyPassword(password, user.password_hash)) {
    return response.status(401).json({ error: 'Identifiants invalides.' });
  }

  const token = signToken({ id: user.id, name: user.name, email: user.email });
  return response.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/auth/me', requireAuth, async (request, response) => {
  const user = await readUserById(request.user.id);
  if (!user) {
    return response.status(404).json({ error: 'Utilisateur introuvable.' });
  }
  return response.json({ user });
});

app.use('/api', (request, response, next) => {
  if (request.path === '/health' || request.path.startsWith('/auth')) return next();
  return requireAuth(request, response, next);
});

app.get('/api/teams', async (request, response) => {
  response.json(sortTeamsByRanking(await readTeams()));
});

app.get('/api/matches', async (request, response) => {
  response.json(await readMatches());
});

app.post('/api/matches', async (request, response) => {
  const home = typeof request.body.home === 'string' ? request.body.home.trim() : '';
  const away = typeof request.body.away === 'string' ? request.body.away.trim() : '';
  const dateISO = typeof request.body.dateISO === 'string' ? request.body.dateISO : '';
  const parsedDate = new Date(`${dateISO}T12:00:00`);
  if (!home || !away || home === away || !/^\d{4}-\d{2}-\d{2}$/.test(dateISO) || Number.isNaN(parsedDate.getTime())) {
    return response.status(400).json({ error: 'Choisissez deux équipes différentes et une date valide.' });
  }
  const teams = await readTeams();
  if (!teams.some((team) => team.name === home) || !teams.some((team) => team.name === away)) {
    return response.status(400).json({ error: 'Une des équipes sélectionnées est introuvable.' });
  }
  const dateLabel = parsedDate.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' }).replace('.', '').split(' ');
  const match = { id: `match-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, dateISO, day: dateLabel[0].toUpperCase(), date: dateLabel[1], month: dateLabel[2].toUpperCase(), home, away, status: 'Programmé', type: 'week' };
  const matches = await readMatches();
  matches.push(match);
  await writeMatches(matches);
  return response.status(201).json(match);
});

app.put('/api/matches/:id', async (request, response) => {
  const { id } = request.params;
  const homeScore = Number(request.body.homeScore);
  const awayScore = Number(request.body.awayScore);
  if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore) || homeScore < 0 || awayScore < 0 || homeScore > 99 || awayScore > 99) {
    return response.status(400).json({ error: 'Les scores doivent être des nombres entiers compris entre 0 et 99.' });
  }
  const matches = await readMatches();
  const match = matches.find((item) => item.id === id);
  if (!match) return response.status(404).json({ error: 'Match introuvable.' });
  const teams = await readTeams();
  if (!teams.some((team) => team.name === match.home) || !teams.some((team) => team.name === match.away)) {
    return response.status(400).json({ error: 'Les équipes du match sont introuvables dans le classement.' });
  }
  if (Number.isInteger(match.homeScore) && Number.isInteger(match.awayScore)) {
    applyMatchStats(teams, match, match.homeScore, match.awayScore, -1);
  }
  applyMatchStats(teams, match, homeScore, awayScore, 1);
  match.homeScore = homeScore;
  match.awayScore = awayScore;
  match.status = 'Terminé';
  await writeTeams(teams);
  await writeMatches(matches);
  return response.json({ match, teams: sortTeamsByRanking(teams) });
});

app.get('/api/scorers', async (request, response) => {
  response.json(sortScorersByRanking(await readScorers()));
});

app.post('/api/scorers', async (request, response) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const team = typeof request.body.team === 'string' ? request.body.team.trim() : '';
  const stats = Object.fromEntries(['goals', 'assists', 'appearances', 'minutes', 'yellowCards', 'redCards'].map((key) => [key, Number(request.body[key]) ]));
  if (!name || !team || Object.values(stats).some((value) => !Number.isInteger(value) || value < 0)) {
    return response.status(400).json({ error: 'Le nom, l’équipe et des statistiques entières positives sont requis.' });
  }
  if (!(await readTeams()).some((entry) => entry.name === team)) return response.status(400).json({ error: 'Équipe introuvable.' });
  const scorers = await readScorers();
  if (scorers.some((player) => player.name.toLocaleLowerCase('fr') === name.toLocaleLowerCase('fr'))) {
    return response.status(409).json({ error: 'Un joueur porte déjà ce nom.' });
  }
  const player = { initials: name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(), name, team, ...stats };
  scorers.push(player);
  await writeCollection('scorers', scorers);
  return response.status(201).json(player);
});

app.put('/api/scorers/:name', async (request, response) => {
  const originalName = decodeURIComponent(request.params.name);
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const team = typeof request.body.team === 'string' ? request.body.team.trim() : '';
  const stats = Object.fromEntries(['goals', 'assists', 'appearances', 'minutes', 'yellowCards', 'redCards'].map((key) => [key, Number(request.body[key]) ]));
  if (!name || !team || Object.values(stats).some((value) => !Number.isInteger(value) || value < 0)) {
    return response.status(400).json({ error: 'Le nom, l’équipe et des statistiques entières positives sont requis.' });
  }
  if (!(await readTeams()).some((entry) => entry.name === team)) return response.status(400).json({ error: 'Équipe introuvable.' });
  const scorers = await readScorers();
  const index = scorers.findIndex((player) => player.name.toLocaleLowerCase('fr') === originalName.toLocaleLowerCase('fr'));
  if (index === -1) return response.status(404).json({ error: 'Joueur introuvable.' });
  if (scorers.some((player) => player.name.toLocaleLowerCase('fr') === name.toLocaleLowerCase('fr') && player.name.toLocaleLowerCase('fr') !== originalName.toLocaleLowerCase('fr'))) {
    return response.status(409).json({ error: 'Un joueur porte déjà ce nom.' });
  }
  const player = { initials: name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(), name, team, ...stats };
  scorers[index] = player;
  await writeCollection('scorers', scorers);
  return response.json(player);
});

app.get('/api/cards', async (request, response) => {
  response.json(await readCards());
});

app.post('/api/cards', async (request, response) => {
  const team = typeof request.body.team === 'string' ? request.body.team.trim() : '';
  const type = request.body.type;
  const count = Number(request.body.count);
  if (!team || !['yellow', 'red'].includes(type) || !Number.isInteger(count) || count <= 0) {
    return response.status(400).json({ error: 'Choisissez une équipe, un type et un nombre de cartons valide.' });
  }
  if (!(await readTeams()).some((entry) => entry.name === team)) {
    return response.status(400).json({ error: 'Équipe introuvable.' });
  }
  const cards = await readCards();
  const card = cards.find((entry) => entry.team === team) || { team, yellow: 0, red: 0 };
  card[type] = Number(card[type] || 0) + count;
  const index = cards.findIndex((entry) => entry.team === team);
  if (index >= 0) cards[index] = card;
  else cards.push(card);
  await writeCards(cards);
  return response.json(cards);
});

app.get('/api/coaches', async (request, response) => {
  response.json(await readCoaches());
});

app.post('/api/coaches', async (request, response) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const team = typeof request.body.team === 'string' ? request.body.team.trim() : '';

  if (!name || !team) {
    return response.status(400).json({ error: 'Le nom et l’équipe sont obligatoires.' });
  }

  const coaches = await readCoaches();
  if (coaches.some((coach) => coach.name.toLowerCase() === name.toLowerCase())) {
    return response.status(409).json({ error: 'Cet entraîneur existe déjà.' });
  }

  const newCoach = { name, team };
  coaches.push(newCoach);
  await writeCoaches(coaches);
  return response.status(201).json(newCoach);
});

app.put('/api/coaches/:name', async (request, response) => {
  const originalName = decodeURIComponent(request.params.name);
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const team = typeof request.body.team === 'string' ? request.body.team.trim() : '';

  if (!name || !team) {
    return response.status(400).json({ error: 'Le nom et l’équipe sont obligatoires.' });
  }

  const coaches = await readCoaches();
  const index = coaches.findIndex((coach) => coach.name.toLowerCase() === originalName.toLowerCase());
  if (index === -1) {
    return response.status(404).json({ error: 'Entraîneur introuvable.' });
  }

  const duplicate = coaches.find((coach) => coach.name.toLowerCase() === name.toLowerCase() && coach.name.toLowerCase() !== originalName.toLowerCase());
  if (duplicate) {
    return response.status(409).json({ error: 'Cet entraîneur existe déjà.' });
  }

  const updatedCoach = { name, team };
  coaches[index] = updatedCoach;
  await writeCoaches(coaches);
  return response.json(updatedCoach);
});

app.delete('/api/coaches/:name', async (request, response) => {
  const coachName = decodeURIComponent(request.params.name);
  const coaches = await readCoaches();
  const filteredCoaches = coaches.filter((coach) => coach.name.toLowerCase() !== coachName.toLowerCase());

  if (filteredCoaches.length === coaches.length) {
    return response.status(404).json({ error: 'Entraîneur introuvable.' });
  }

  await writeCoaches(filteredCoaches);
  return response.status(204).send();
});

app.get('/api/referees', async (request, response) => {
  response.json(await readReferees());
});

app.get('/api/stadiums', async (request, response) => {
  const query = String(request.query.q || '').trim().toLocaleLowerCase('fr');
  const availability = String(request.query.availability || 'all');
  const filteredStadiums = (await readStadiums()).filter((stadium) => (`${stadium.name} ${stadium.city}`).toLocaleLowerCase('fr').includes(query) && (availability === 'all' || (stadium.availability || 'available') === availability));
  response.json(filteredStadiums);
});

app.get('/api/facilities', async (request, response) => {
  const query = String(request.query.q || '').trim().toLocaleLowerCase('fr');
  const availability = String(request.query.availability || 'all');
  const filteredFacilities = (await readFacilities()).filter((facility) => (`${facility.name} ${facility.type} ${facility.location}`).toLocaleLowerCase('fr').includes(query) && (availability === 'all' || facility.availability === availability));
  response.json(filteredFacilities);
});

app.post('/api/referees', async (request, response) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const level = typeof request.body.level === 'string' ? request.body.level.trim() : '';

  if (!name || !level) {
    return response.status(400).json({ error: 'Le nom et le niveau sont obligatoires.' });
  }

  const referees = await readReferees();
  if (referees.some((referee) => referee.name.toLowerCase() === name.toLowerCase())) {
    return response.status(409).json({ error: 'Cet arbitre existe déjà.' });
  }

  const newReferee = { name, level };
  referees.push(newReferee);
  await writeReferees(referees);
  return response.status(201).json(newReferee);
});

app.put('/api/referees/:name', async (request, response) => {
  const originalName = decodeURIComponent(request.params.name);
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const level = typeof request.body.level === 'string' ? request.body.level.trim() : '';

  if (!name || !level) {
    return response.status(400).json({ error: 'Le nom et le niveau sont obligatoires.' });
  }

  const referees = await readReferees();
  const index = referees.findIndex((referee) => referee.name.toLowerCase() === originalName.toLowerCase());
  if (index === -1) {
    return response.status(404).json({ error: 'Arbitre introuvable.' });
  }

  const duplicate = referees.find((referee) => referee.name.toLowerCase() === name.toLowerCase() && referee.name.toLowerCase() !== originalName.toLowerCase());
  if (duplicate) {
    return response.status(409).json({ error: 'Cet arbitre existe déjà.' });
  }

  const updatedReferee = { name, level };
  referees[index] = updatedReferee;
  await writeReferees(referees);
  return response.json(updatedReferee);
});

app.delete('/api/referees/:name', async (request, response) => {
  const refereeName = decodeURIComponent(request.params.name);
  const referees = await readReferees();
  const filteredReferees = referees.filter((referee) => referee.name.toLowerCase() !== refereeName.toLowerCase());

  if (filteredReferees.length === referees.length) {
    return response.status(404).json({ error: 'Arbitre introuvable.' });
  }

  await writeReferees(filteredReferees);
  return response.status(204).send();
});

app.post('/api/stadiums', async (request, response) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const city = typeof request.body.city === 'string' ? request.body.city.trim() : '';
  const capacity = Number(request.body.capacity);
  const availability = typeof request.body.availability === 'string' ? request.body.availability : 'available';

  if (!name || !city || !Number.isFinite(capacity) || capacity <= 0 || !['available', 'maintenance', 'unavailable'].includes(availability)) {
    return response.status(400).json({ error: 'Le nom, la ville et une capacité valide sont requis.' });
  }

  const stadiums = await readStadiums();
  if (stadiums.some((stadium) => stadium.name.toLowerCase() === name.toLowerCase())) {
    return response.status(409).json({ error: 'Ce stade existe déjà.' });
  }

  const newStadium = { name, city, capacity, availability };
  stadiums.push(newStadium);
  await writeStadiums(stadiums);
  return response.status(201).json(newStadium);
});

app.put('/api/stadiums/:name', async (request, response) => {
  const originalName = decodeURIComponent(request.params.name);
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const city = typeof request.body.city === 'string' ? request.body.city.trim() : '';
  const capacity = Number(request.body.capacity);
  const availability = typeof request.body.availability === 'string' ? request.body.availability : 'available';

  if (!name || !city || !Number.isFinite(capacity) || capacity <= 0 || !['available', 'maintenance', 'unavailable'].includes(availability)) {
    return response.status(400).json({ error: 'Le nom, la ville et une capacité valide sont requis.' });
  }

  const stadiums = await readStadiums();
  const index = stadiums.findIndex((stadium) => stadium.name.toLowerCase() === originalName.toLowerCase());
  if (index === -1) {
    return response.status(404).json({ error: 'Stade introuvable.' });
  }

  const duplicate = stadiums.find((stadium) => stadium.name.toLowerCase() === name.toLowerCase() && stadium.name.toLowerCase() !== originalName.toLowerCase());
  if (duplicate) {
    return response.status(409).json({ error: 'Ce stade existe déjà.' });
  }

  const updatedStadium = { name, city, capacity, availability };
  stadiums[index] = updatedStadium;
  await writeStadiums(stadiums);
  return response.json(updatedStadium);
});

app.delete('/api/stadiums/:name', async (request, response) => {
  const stadiumName = decodeURIComponent(request.params.name);
  const stadiums = await readStadiums();
  const filteredStadiums = stadiums.filter((stadium) => stadium.name.toLowerCase() !== stadiumName.toLowerCase());

  if (filteredStadiums.length === stadiums.length) {
    return response.status(404).json({ error: 'Stade introuvable.' });
  }

  await writeStadiums(filteredStadiums);
  return response.status(204).send();
});

app.post('/api/facilities', async (request, response) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const type = typeof request.body.type === 'string' ? request.body.type.trim() : '';
  const location = typeof request.body.location === 'string' ? request.body.location.trim() : '';
  const availability = typeof request.body.availability === 'string' ? request.body.availability : 'available';
  if (!name || !type || !location || !['available', 'maintenance', 'unavailable'].includes(availability)) {
    return response.status(400).json({ error: 'Le nom, le type, l’emplacement et une disponibilité valide sont requis.' });
  }
  const facilities = await readFacilities();
  if (facilities.some((facility) => facility.name.toLocaleLowerCase('fr') === name.toLocaleLowerCase('fr'))) {
    return response.status(409).json({ error: 'Cette installation existe déjà.' });
  }
  const facility = { name, type, location, availability };
  facilities.push(facility);
  await writeFacilities(facilities);
  return response.status(201).json(facility);
});

app.put('/api/facilities/:name', async (request, response) => {
  const originalName = decodeURIComponent(request.params.name);
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const type = typeof request.body.type === 'string' ? request.body.type.trim() : '';
  const location = typeof request.body.location === 'string' ? request.body.location.trim() : '';
  const availability = typeof request.body.availability === 'string' ? request.body.availability : 'available';
  if (!name || !type || !location || !['available', 'maintenance', 'unavailable'].includes(availability)) {
    return response.status(400).json({ error: 'Le nom, le type, l’emplacement et une disponibilité valide sont requis.' });
  }
  const facilities = await readFacilities();
  const index = facilities.findIndex((facility) => facility.name.toLocaleLowerCase('fr') === originalName.toLocaleLowerCase('fr'));
  if (index === -1) return response.status(404).json({ error: 'Installation introuvable.' });
  if (facilities.some((facility) => facility.name.toLocaleLowerCase('fr') === name.toLocaleLowerCase('fr') && facility.name.toLocaleLowerCase('fr') !== originalName.toLocaleLowerCase('fr'))) {
    return response.status(409).json({ error: 'Cette installation existe déjà.' });
  }
  const updatedFacility = { name, type, location, availability };
  facilities[index] = updatedFacility;
  await writeFacilities(facilities);
  return response.json(updatedFacility);
});

app.delete('/api/facilities/:name', async (request, response) => {
  const facilityName = decodeURIComponent(request.params.name);
  const facilities = await readFacilities();
  const filteredFacilities = facilities.filter((facility) => facility.name.toLocaleLowerCase('fr') !== facilityName.toLocaleLowerCase('fr'));
  if (filteredFacilities.length === facilities.length) return response.status(404).json({ error: 'Installation introuvable.' });
  await writeFacilities(filteredFacilities);
  return response.status(204).send();
});

app.post('/api/teams', async (request, response) => {
  const name = typeof request.body.name === 'string' ? request.body.name.trim() : '';
  const short = typeof request.body.short === 'string' ? request.body.short.trim().toUpperCase() : '';

  if (!name || !short || short.length > 3) {
    return response.status(400).json({ error: 'Le nom et une abréviation de 1 à 3 caractères sont requis.' });
  }

  const teams = await readTeams();
  if (teams.some((team) => team.name.toLowerCase() === name.toLowerCase())) {
    return response.status(409).json({ error: 'Cette équipe existe déjà.' });
  }

  const team = { name, short, logo: 'logo-r', played: 0, wins: 0, draws: 0, losses: 0, diff: '0', points: 0 };
  teams.push(team);
  await writeTeams(teams);
  return response.status(201).json(team);
});

app.delete('/api/teams/:name', async (request, response) => {
  const teamName = decodeURIComponent(request.params.name);
  const teams = await readTeams();
  const filteredTeams = teams.filter((team) => team.name.toLowerCase() !== teamName.toLowerCase());

  if (filteredTeams.length === teams.length) {
    return response.status(404).json({ error: 'Équipe introuvable.' });
  }

  await writeTeams(filteredTeams);
  return response.status(204).send();
});

app.use('/api', (request, response) => {
  response.status(404).json({ error: 'Route API introuvable.' });
});

app.use((error, request, response, next) => {
  if (response.headersSent) return next(error);
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 500
    ? error.status
    : 500;
  if (status >= 500) console.error('Erreur serveur Footboard :', error);
  if (request.path.startsWith('/api')) {
    return response.status(status).json({
      error: status === 500 ? 'Une erreur interne est survenue.' : 'Requête invalide.'
    });
  }
  return response.sendStatus(status);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Footboard API disponible sur http://localhost:${port}`);
  });
}

module.exports = app;
