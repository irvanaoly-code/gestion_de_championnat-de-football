const legacyClubNames = {
  'Racing Club': 'Real Madrid',
  'Union Sportive': 'FC Barcelona',
  'FC Montreuil': 'Manchester United',
  'Olympique Nord': 'Liverpool FC'
};
const clubs = [
  { id: 'real-madrid', name: 'Real Madrid', short: 'RMA', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', city: 'Madrid', country: 'Espagne', founded: 1902, league: 'La Liga', stadium: 'Santiago Bernabéu', website: 'https://www.realmadrid.com/', nickname: 'Los Blancos · Les Merengues', colors: 'Blanc, avec des détails dorés et bleu marine', rivalry: 'Atlético de Madrid (Derbi madrileño) et FC Barcelona (El Clásico)', achievements: 'Club au palmarès européen exceptionnel, avec de nombreuses victoires en Coupe d’Europe et en Ligue des champions.', legends: ['Alfredo Di Stéfano', 'Raúl', 'Cristiano Ronaldo', 'Zinedine Zidane'], description: 'Fondé au début du XXᵉ siècle dans la capitale espagnole, le Real Madrid est devenu une référence du football européen. Le club joue ses rencontres à domicile au Santiago Bernabéu.' },
  { id: 'fc-barcelona', name: 'FC Barcelona', short: 'FCB', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', city: 'Barcelone', country: 'Espagne', founded: 1899, league: 'La Liga', stadium: 'Spotify Camp Nou', website: 'https://www.fcbarcelona.com/', nickname: 'Barça · Blaugrana', colors: 'Bleu et grenat', rivalry: 'Real Madrid (El Clásico) et Espanyol de Barcelona (Derbi barceloní)', achievements: 'A remporté la Ligue des champions à plusieurs reprises et est reconnu pour son centre de formation, La Masia.', legends: ['Johan Cruyff', 'Xavi', 'Andrés Iniesta', 'Lionel Messi'], description: 'Club catalan fondé par Joan Gamper. Son identité associe les couleurs blaugrana, la devise « Més que un club » et une tradition de formation de joueurs.' },
  { id: 'manchester-united', name: 'Manchester United', short: 'MUN', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', city: 'Manchester', country: 'Angleterre', founded: 1878, league: 'Premier League', stadium: 'Old Trafford', website: 'https://www.manutd.com/', nickname: 'The Red Devils · Les Diables rouges', colors: 'Rouge, blanc et noir', rivalry: 'Liverpool FC et Manchester City (Derby de Manchester)', achievements: 'Premier club anglais à remporter la Coupe d’Europe des clubs champions, en 1968. L’équipe de 1999 a réalisé un triplé historique.', legends: ['Bobby Charlton', 'George Best', 'Eric Cantona', 'Wayne Rooney'], description: 'Créé sous le nom de Newton Heath, le club a adopté son nom actuel en 1902. Old Trafford, son stade depuis 1910, est surnommé le « Théâtre des rêves ».' },
  { id: 'liverpool', name: 'Liverpool FC', short: 'LIV', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', city: 'Liverpool', country: 'Angleterre', founded: 1892, league: 'Premier League', stadium: 'Anfield', website: 'https://www.liverpoolfc.com/', nickname: 'The Reds · Les Rouges', colors: 'Rouge et blanc', rivalry: 'Everton (Merseyside Derby) et Manchester United', achievements: 'A remporté plusieurs fois la Coupe d’Europe et la Ligue des champions. Son hymne emblématique est « You’ll Never Walk Alone ».', legends: ['Kenny Dalglish', 'Steven Gerrard', 'Ian Rush', 'Mohamed Salah'], description: 'Fondé à la suite d’un différend autour du stade d’Anfield, Liverpool s’est rapidement imposé comme l’un des grands clubs anglais. Anfield est son domicile depuis ses débuts.' },
  { id: 'arsenal', name: 'Arsenal FC', short: 'ARS', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', city: 'Londres', country: 'Angleterre', founded: 1886, league: 'Premier League', stadium: 'Emirates Stadium', website: 'https://www.arsenal.com/', nickname: 'The Gunners · Les Canonniers', colors: 'Rouge et blanc', rivalry: 'Tottenham Hotspur (North London Derby)', achievements: 'L’équipe a terminé la saison de Premier League 2003-2004 sans défaite, un exploit célébré sous le nom des « Invincibles ».', legends: ['Thierry Henry', 'Dennis Bergkamp', 'Tony Adams', 'Patrick Vieira'], description: 'Fondé par des ouvriers de l’arsenal royal de Woolwich, le club s’est ensuite installé dans le nord de Londres. Son emblème historique est un canon.' },
  { id: 'chelsea', name: 'Chelsea FC', short: 'CHE', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', city: 'Londres', country: 'Angleterre', founded: 1905, league: 'Premier League', stadium: 'Stamford Bridge', website: 'https://www.chelseafc.com/', nickname: 'The Blues · Les Bleus', colors: 'Bleu royal et blanc', rivalry: 'Arsenal, Tottenham Hotspur et les autres clubs londoniens', achievements: 'Vainqueur de la Ligue des champions en 2012 et en 2021; le club a également remporté la Ligue Europa.', legends: ['Frank Lampard', 'John Terry', 'Didier Drogba', 'Gianfranco Zola'], description: 'Basé dans le quartier de Fulham, à l’ouest de Londres, Chelsea joue à Stamford Bridge depuis sa création. Le lion de son écusson est l’un de ses symboles connus.' },
  { id: 'manchester-city', name: 'Manchester City', short: 'MCI', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', city: 'Manchester', country: 'Angleterre', founded: 1880, league: 'Premier League', stadium: 'Etihad Stadium', website: 'https://www.mancity.com/', nickname: 'City · The Citizens', colors: 'Bleu ciel et blanc', rivalry: 'Manchester United (Derby de Manchester)', achievements: 'A remporté son premier titre de Ligue des champions en 2023 et réalisé le triplé anglais et européen la même année.', legends: ['Colin Bell', 'Sergio Agüero', 'David Silva', 'Vincent Kompany'], description: 'Le club a été fondé sous le nom de St. Mark’s avant d’adopter celui de Manchester City. Il évolue dans le quartier d’Etihad Campus, à l’est de la ville.' },
  { id: 'psg', name: 'Paris Saint-Germain', short: 'PSG', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg', city: 'Paris', country: 'France', founded: 1970, league: 'Ligue 1', stadium: 'Parc des Princes', website: 'https://www.psg.fr/', nickname: 'PSG · Les Rouge et Bleu', colors: 'Bleu, rouge et blanc', rivalry: 'Olympique de Marseille (Le Classique)', achievements: 'Vainqueur de la Coupe des vainqueurs de coupe en 1996 et régulièrement présent dans les compétitions européennes.', legends: ['Rai', 'Ronaldinho', 'Pauleta', 'Zlatan Ibrahimović'], description: 'Créé en 1970, le Paris Saint-Germain représente la capitale française. Son écusson réunit notamment la tour Eiffel et la fleur de lys.' },
  { id: 'bayern-munich', name: 'Bayern Munich', short: 'FCB', logoUrl: 'https://crests.football-data.org/5.svg', city: 'Munich', country: 'Allemagne', founded: 1900, league: 'Bundesliga', stadium: 'Allianz Arena', website: 'https://fcbayern.com/', nickname: 'Die Roten · Les Bavarois', colors: 'Rouge et blanc', rivalry: 'Borussia Dortmund (Der Klassiker) et TSV 1860 Munich', achievements: 'A remporté plusieurs fois la Ligue des champions; en 2020, le club a réalisé un sextuplé, gagnant six compétitions sur une année.', legends: ['Franz Beckenbauer', 'Gerd Müller', 'Oliver Kahn', 'Thomas Müller'], description: 'Fondé à Munich, le Bayern est l’un des clubs les plus titrés d’Allemagne. L’Allianz Arena, reconnaissable à sa façade illuminée, accueille ses matchs à domicile.' },
  { id: 'juventus', name: 'Juventus FC', short: 'JUV', logoUrl: 'https://crests.football-data.org/109.svg', city: 'Turin', country: 'Italie', founded: 1897, league: 'Serie A', stadium: 'Allianz Stadium', website: 'https://www.juventus.com/', nickname: 'La Vecchia Signora · I Bianconeri', colors: 'Noir et blanc', rivalry: 'Torino FC (Derby della Mole) et Inter Milan (Derby d’Italia)', achievements: 'Première équipe à avoir remporté les trois principales compétitions européennes de clubs de l’UEFA.', legends: ['Giampiero Boniperti', 'Alessandro Del Piero', 'Gianluigi Buffon', 'Michel Platini'], description: 'Fondée par des étudiants à Turin, la Juventus a adopté ses célèbres maillots rayés noir et blanc au début du XXᵉ siècle. Son stade est situé dans le nord de la ville.' },
  { id: 'ac-milan', name: 'AC Milan', short: 'MIL', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg', city: 'Milan', country: 'Italie', founded: 1899, league: 'Serie A', stadium: 'San Siro', website: 'https://www.acmilan.com/', nickname: 'I Rossoneri · Les Rouge et Noir', colors: 'Rouge et noir', rivalry: 'Inter Milan (Derby della Madonnina)', achievements: 'A remporté la Ligue des champions à sept reprises, ce qui en fait l’un des clubs les plus titrés de la compétition.', legends: ['Paolo Maldini', 'Franco Baresi', 'Marco van Basten', 'Kaká'], description: 'Fondé par des passionnés de football anglais et italiens, l’AC Milan partage San Siro avec son rival local, l’Inter. Le rouge et le noir symbolisent l’identité du club.' },
  { id: 'inter-milan', name: 'Inter Milan', short: 'INT', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg', city: 'Milan', country: 'Italie', founded: 1908, league: 'Serie A', stadium: 'San Siro', website: 'https://www.inter.it/', nickname: 'I Nerazzurri · Les Noir et Bleu', colors: 'Noir et bleu', rivalry: 'AC Milan (Derby della Madonnina) et Juventus (Derby d’Italia)', achievements: 'En 2010, l’Inter est devenu le premier club italien à gagner le championnat, la coupe nationale et la Ligue des champions la même saison.', legends: ['Giuseppe Meazza', 'Javier Zanetti', 'Giuseppe Bergomi', 'Ronaldo'], description: 'Fondé par des membres dissidents du Milan Cricket and Football Club, l’Inter affirme dès son origine vouloir accueillir des joueurs de toutes nationalités.' }
];
for (const key of ['footboard-teams', 'footboard-matches', 'footboard-scorers']) {
  try {
    const cachedRecords = JSON.parse(window.localStorage.getItem(key) || 'null');
    if (!Array.isArray(cachedRecords)) continue;
    let changed = false;
    for (const record of cachedRecords) {
      for (const field of ['name', 'team', 'home', 'away']) {
        if (legacyClubNames[record[field]]) {
          record[field] = legacyClubNames[record[field]];
          changed = true;
        }
      }
      if (key === 'footboard-teams') {
        const metadata = {
          'Real Madrid': { short: 'RMA', logo: 'logo-r' },
          'FC Barcelona': { short: 'FCB', logo: 'logo-u' },
          'Manchester United': { short: 'MUN', logo: 'logo-m' },
          'Liverpool FC': { short: 'LIV', logo: 'logo-o' }
        }[record.name];
        if (metadata) Object.assign(record, metadata);
      }
    }
    if (changed) window.localStorage.setItem(key, JSON.stringify(cachedRecords));
  } catch (error) {
    window.localStorage.removeItem(key);
  }
}
let teams = [
  { name: 'Real Madrid', short: 'RMA', logo: 'logo-r', played: 7, wins: 5, draws: 1, losses: 1, diff: '+9', points: 16 },
  { name: 'FC Barcelona', short: 'FCB', logo: 'logo-u', played: 7, wins: 4, draws: 2, losses: 1, diff: '+6', points: 14 },
  { name: 'Manchester United', short: 'MUN', logo: 'logo-m', played: 7, wins: 3, draws: 2, losses: 2, diff: '+2', points: 11 },
  { name: 'Liverpool FC', short: 'LIV', logo: 'logo-o', played: 7, wins: 2, draws: 1, losses: 4, diff: '-3', points: 7 }
];
const storedTeams = JSON.parse(window.localStorage.getItem('footboard-teams') || 'null');
if (Array.isArray(storedTeams) && storedTeams.length) teams = storedTeams;
const matches = [
  { id: 'fixture-rc-fm-2026-09-26', dateISO: '2026-09-26', day: 'SAM', date: '26', month: 'SEP', home: 'Real Madrid', away: 'Manchester United', status: '18:30', type: 'today' },
  { id: 'fixture-us-on-2026-10-03', dateISO: '2026-10-03', day: 'SAM', date: '03', month: 'OCT', home: 'FC Barcelona', away: 'Liverpool FC', status: '16:00', type: 'week' },
  { id: 'fixture-fm-us-2026-10-04', dateISO: '2026-10-04', day: 'DIM', date: '04', month: 'OCT', home: 'Manchester United', away: 'FC Barcelona', status: '15:00', type: 'week' }
];
const storedMatches = JSON.parse(window.localStorage.getItem('footboard-matches') || 'null');
if (Array.isArray(storedMatches)) matches.splice(0, matches.length, ...storedMatches);
const scorers = [
  { initials: 'KM', name: 'Karim Mansouri', team: 'Real Madrid', goals: 8, assists: 3, appearances: 7, minutes: 590, yellowCards: 1, redCards: 0 },
  { initials: 'LM', name: 'Lucas Martin', team: 'FC Barcelona', goals: 6, assists: 4, appearances: 7, minutes: 560, yellowCards: 2, redCards: 0 },
  { initials: 'AD', name: 'Amine Diallo', team: 'Manchester United', goals: 5, assists: 2, appearances: 6, minutes: 488, yellowCards: 1, redCards: 0 },
  { initials: 'TB', name: 'Thomas Bernard', team: 'Liverpool FC', goals: 4, assists: 1, appearances: 7, minutes: 603, yellowCards: 0, redCards: 1 }
];
const storedScorers = JSON.parse(window.localStorage.getItem('footboard-scorers') || 'null');
if (Array.isArray(storedScorers)) scorers.splice(0, scorers.length, ...storedScorers);
const coaches = [
  { name: 'Nabil Bensaïd', team: 'Real Madrid' },
  { name: 'Sophie Laurent', team: 'FC Barcelona' },
  { name: 'Omar Haddad', team: 'Manchester United' },
  { name: 'Claire Moreau', team: 'Liverpool FC' }
];
const referees = [
  { name: 'Hugo Bernard', level: 'Fédéral 1' },
  { name: 'Lina Robert', level: 'Fédéral 1' },
  { name: 'Marc Diallo', level: 'Régional' }
];
const stadiums = [
  { name: 'Stade du 11 Novembre', city: 'Rabat', capacity: 45000, availability: 'available' },
  { name: 'Complexe sportif', city: 'Casablanca', capacity: 32000, availability: 'available' },
  { name: 'Stade municipal', city: 'Tanger', capacity: 28000, availability: 'maintenance' }
];
const facilities = [];
const cards = [
  { team: 'Real Madrid', yellow: 5, red: 1 },
  { team: 'FC Barcelona', yellow: 4, red: 1 },
  { team: 'Manchester United', yellow: 6, red: 2 },
  { team: 'Liverpool FC', yellow: 3, red: 0 }
];
const storedNotifications = JSON.parse(window.localStorage.getItem('footboard-notifications') || '[]');
const notifications = Array.isArray(storedNotifications) ? storedNotifications : [];
const defaultSettings = { competition: 'Championnat national', season: '2026/27', theme: 'light', language: 'fr', compact: false, notifications: true };
const savedSettings = JSON.parse(window.localStorage.getItem('footboard-settings') || 'null');
const settings = { ...defaultSettings, ...(savedSettings && typeof savedSettings === 'object' ? savedSettings : {}) };
const $ = (selector) => document.querySelector(selector);
const readStoredAuth = () => {
  const auth = JSON.parse(window.localStorage.getItem('footboard-auth') || 'null');
  return auth && typeof auth === 'object' ? auth : null;
};
const writeStoredAuth = (auth) => {
  if (auth && auth.token) {
    window.localStorage.setItem('footboard-auth', JSON.stringify(auth));
    return;
  }
  window.localStorage.removeItem('footboard-auth');
};
const clearStoredAuth = () => {
  window.localStorage.removeItem('footboard-auth');
  window.localStorage.removeItem('footboard-account');
};
const getAuthorizationHeaders = (headers = {}) => {
  const token = readStoredAuth()?.token;
  const nextHeaders = new Headers(headers);
  if (token) nextHeaders.set('Authorization', `Bearer ${token}`);
  return nextHeaders;
};
const originalFetch = window.fetch.bind(window);
window.fetch = (input, init = {}) => {
  if (typeof input === 'string' && input.startsWith('/api')) {
    const headers = getAuthorizationHeaders(init.headers || {});
    return originalFetch(input, { ...init, headers });
  }
  if (input instanceof Request && input.url.startsWith('/api')) {
    const headers = getAuthorizationHeaders(input.headers);
    return originalFetch(new Request(input, { ...init, headers }));
  }
  return originalFetch(input, init);
};
function sortTeamsByRanking(teamList) {
  return [...teamList].sort((firstTeam, secondTeam) => {
    const pointsDifference = Number(secondTeam.points || 0) - Number(firstTeam.points || 0);
    if (pointsDifference) return pointsDifference;
    const goalDifference = Number.parseInt(secondTeam.diff, 10) - Number.parseInt(firstTeam.diff, 10);
    if (goalDifference) return goalDifference;
    const winsDifference = Number(secondTeam.wins || 0) - Number(firstTeam.wins || 0);
    if (winsDifference) return winsDifference;
    return firstTeam.name.localeCompare(secondTeam.name, 'fr');
  });
}
function createClubCrest(club, className = 'club-crest') {
  const crest = document.createElement('span');
  crest.className = className;
  const fallback = document.createElement('span');
  fallback.className = 'club-crest-fallback';
  fallback.textContent = club.short;
  fallback.hidden = true;
  const image = document.createElement('img');
  image.src = club.logoUrl;
  image.alt = `Écusson de ${club.name}`;
  image.loading = 'lazy';
  image.addEventListener('error', () => {
    image.hidden = true;
    fallback.hidden = false;
  }, { once: true });
  crest.append(fallback, image);
  return crest;
}
function renderClubDirectory() {
  const grid = $('#club-grid');
  grid.replaceChildren();
  for (const club of clubs) {
    const card = document.createElement('article');
    card.className = 'club-card';
    card.append(createClubCrest(club));
    const information = document.createElement('div');
    information.className = 'club-card-info';
    const name = document.createElement('h3');
    name.textContent = club.name;
    const meta = document.createElement('p');
    meta.textContent = `${club.city} · ${club.league}`;
    information.append(name, meta);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'club-open-button';
    button.dataset.viewClub = club.id;
    button.setAttribute('aria-label', `Consulter la fiche de ${club.name}`);
    button.textContent = 'Voir la fiche →';
    card.append(information, button);
    grid.append(card);
  }
  $('#club-count').textContent = `${clubs.length} clubs`;
}
function openClubDetails(club) {
  if (!club) return;
  const crestContainer = $('#club-details-crest');
  crestContainer.replaceChildren(createClubCrest(club, 'club-detail-crest'));
  $('#club-details-title').textContent = club.name;
  $('#club-details-description').textContent = club.description;
  const details = [
    ['Ville', club.city],
    ['Pays', club.country],
    ['Championnat', club.league],
    ['Fondé en', String(club.founded)],
    ['Stade', club.stadium],
    ['Surnom', club.nickname],
    ['Couleurs', club.colors]
  ];
  const list = $('#club-details-content');
  list.replaceChildren();
  for (const [label, value] of details) {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value;
    row.append(term, description);
    list.append(row);
  }
  const websiteRow = document.createElement('div');
  const websiteTerm = document.createElement('dt');
  websiteTerm.textContent = 'Site officiel';
  const websiteDescription = document.createElement('dd');
  const websiteLink = document.createElement('a');
  websiteLink.href = club.website;
  websiteLink.target = '_blank';
  websiteLink.rel = 'noopener noreferrer';
  websiteLink.textContent = new URL(club.website).hostname.replace(/^www\./, '');
  websiteDescription.append(websiteLink);
  websiteRow.append(websiteTerm, websiteDescription);
  list.append(websiteRow);
  const profileSections = $('#club-profile-sections');
  profileSections.replaceChildren();
  const sections = [
    ['Repères historiques', club.achievements],
    ['Rivalités', club.rivalry]
  ];
  for (const [title, text] of sections) {
    const article = document.createElement('section');
    article.className = 'club-profile-section';
    const heading = document.createElement('h3');
    heading.textContent = title;
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    article.append(heading, paragraph);
    profileSections.append(article);
  }
  const legendsSection = document.createElement('section');
  legendsSection.className = 'club-profile-section';
  const legendsHeading = document.createElement('h3');
  legendsHeading.textContent = 'Joueurs emblématiques';
  const legendsList = document.createElement('ul');
  legendsList.className = 'club-legends-list';
  for (const legend of club.legends) {
    const item = document.createElement('li');
    item.textContent = legend;
    legendsList.append(item);
  }
  legendsSection.append(legendsHeading, legendsList);
  profileSections.append(legendsSection);
  $('#club-details-modal').hidden = false;
}
function closeClubDetails() { $('#club-details-modal').hidden = true; }
function renderStandings() {
  const rankedTeams = sortTeamsByRanking(teams);
  $('#standings-body').innerHTML = rankedTeams.map((team, index) => `<tr><td class="${index === 0 ? 'rank-first' : ''}">${index + 1}</td><td><span class="team-cell"><span class="team-logo ${team.logo}">${team.short}</span>${team.name}</span></td><td>${team.played}</td><td>${team.wins}</td><td>${team.draws}</td><td>${team.losses}</td><td>${team.diff}</td><td>${team.points}</td></tr>`).join('');
  renderChampionshipPrediction(rankedTeams);
}
function renderChampionshipPrediction(rankedTeams = sortTeamsByRanking(teams)) {
  const candidates = rankedTeams.map((team) => {
    const played = Number(team.played) || 0;
    const pointsPerMatch = played ? (Number(team.points) || 0) / played : 0;
    const winRate = played ? (Number(team.wins) || 0) / played : 0;
    const goalDifference = Number.parseInt(team.diff, 10) || 0;
    const goalDifferencePerMatch = played ? goalDifference / played : 0;
    const score = played
      ? Math.max(0.1, pointsPerMatch * 0.7 + winRate * 3 * 0.2 + Math.max(-2, Math.min(2, goalDifferencePerMatch)) * 0.1 + 0.2)
      : 1;
    return { team, score };
  });
  const totalScore = candidates.reduce((total, candidate) => total + candidate.score, 0);
  const rawTenths = candidates.map(({ score }) => (totalScore ? (score / totalScore) * 1000 : 0));
  const probabilityTenths = rawTenths.map(Math.floor);
  const remainingTenths = candidates.length ? 1000 - probabilityTenths.reduce((total, value) => total + value, 0) : 0;
  const remainderOrder = rawTenths.map((value, index) => ({ index, remainder: value - probabilityTenths[index] }))
    .sort((first, second) => second.remainder - first.remainder);
  for (let index = 0; index < remainingTenths; index += 1) probabilityTenths[remainderOrder[index].index] += 1;
  const list = $('#prediction-list');
  list.replaceChildren();
  for (const [index, { team }] of candidates.slice(0, 10).entries()) {
    const probability = probabilityTenths[index] / 10;
    const row = document.createElement('li');
    row.className = `prediction-row${index === 0 ? ' prediction-favorite' : ''}`;
    const rank = document.createElement('span');
    rank.className = 'prediction-rank';
    rank.textContent = String(index + 1).padStart(2, '0');
    const identity = document.createElement('span');
    identity.className = 'prediction-team';
    const name = document.createElement('strong');
    name.textContent = team.name;
    const details = document.createElement('small');
    details.textContent = `${Number(team.points) || 0} pts · ${Number(team.wins) || 0} victoire${Number(team.wins) === 1 ? '' : 's'}`;
    identity.append(name, details);
    const track = document.createElement('span');
    track.className = 'prediction-track';
    track.setAttribute('aria-hidden', 'true');
    const bar = document.createElement('span');
    bar.style.width = `${probability}%`;
    track.append(bar);
    const percentage = document.createElement('strong');
    percentage.className = 'prediction-percentage';
    percentage.textContent = `${probability.toFixed(1).replace('.', ',')} %`;
    percentage.setAttribute('aria-label', `Estimation : ${percentage.textContent}`);
    row.append(rank, identity, track, percentage);
    list.append(row);
  }
  const count = Math.min(candidates.length, 10);
  $('#prediction-count').textContent = `${count} équipe${count === 1 ? '' : 's'} classée${count === 1 ? '' : 's'}`;
}
function renderTeamOptions() {
  const options = teams.map((team) => `<option>${team.name}</option>`).join('');
  $('#home-team').innerHTML = options;
  $('#away-team').innerHTML = options;
  const coachSelect = $('#coach-team');
  if (coachSelect) {
    coachSelect.innerHTML = options || '<option value="">Aucune équipe</option>';
  }
  const playerSelect = $('#player-team');
  const playerTeamFilter = $('#player-team-filter');
  if (playerSelect) playerSelect.innerHTML = options || '<option value="">Aucune équipe</option>';
  if (playerTeamFilter) {
    const selectedTeam = playerTeamFilter.value;
    playerTeamFilter.innerHTML = '<option value="all">Toutes les équipes</option>' + options;
    if ([...playerTeamFilter.options].some((option) => option.value === selectedTeam)) playerTeamFilter.value = selectedTeam;
  }
}
async function loadTeamsFromApi() {
  try {
    const response = await fetch('/api/teams');
    if (!response.ok) throw new Error('API indisponible');
    const remoteTeams = await response.json();
    if (Array.isArray(remoteTeams) && remoteTeams.length) {
      teams = sortTeamsByRanking(remoteTeams);
      window.localStorage.setItem('footboard-teams', JSON.stringify(teams));
    }
  } catch (error) {
  }
  renderStandings();
  renderTeamOptions();
}
function renderMatches(filter = 'all') {
  const visibleMatches = filter === 'all' ? matches : matches.filter((match) => match.type === filter);
  $('#match-list').innerHTML = visibleMatches.length ? visibleMatches.map((match) => {
    const dateParts = match.dateISO ? new Date(`${match.dateISO}T12:00:00`).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' }).replace('.', '').split(' ') : [match.day, match.date, match.month];
    const isCompleted = Number.isInteger(match.homeScore) && Number.isInteger(match.awayScore);
    const badge = isCompleted ? `${match.homeScore} – ${match.awayScore}` : match.status;
    return `<div class="match-item ${isCompleted ? 'match-completed' : ''}"><div class="match-date">${dateParts[0]}<strong>${dateParts[1]}</strong>${dateParts[2]}</div><div class="match-teams"><span>${match.home}</span><span>${match.away}</span></div><span class="match-badge ${isCompleted ? 'result-badge' : match.type === 'today' ? 'live' : ''}">${badge}</span><button class="mini-button result-action" type="button" data-record-result="${encodeURIComponent(match.id)}">${isCompleted ? 'Modifier le score' : 'Résultat'}</button></div>`;
  }).join('') : '<p class="empty-state">Aucun match dans cette période.</p>';
}
async function loadMatchesFromApi() {
  try {
    const response = await fetch('/api/matches');
    if (!response.ok) throw new Error('API indisponible');
    const remoteMatches = await response.json();
    if (Array.isArray(remoteMatches)) {
      matches.splice(0, matches.length, ...remoteMatches);
      window.localStorage.setItem('footboard-matches', JSON.stringify(matches));
    }
  } catch (error) {
    // Les rencontres mises en cache restent affichées si l’API est arrêtée.
  }
  renderMatches(document.querySelector('.filter.active')?.dataset.filter || 'all');
}
function applyResultToLocalStandings(match, homeScore, awayScore) {
  if (Number.isInteger(match.homeScore) && Number.isInteger(match.awayScore)) {
    applyTeamMatchStats(match.home, match.away, match.homeScore, match.awayScore, -1);
  }
  applyTeamMatchStats(match.home, match.away, homeScore, awayScore, 1);
  match.homeScore = homeScore;
  match.awayScore = awayScore;
  match.status = 'Terminé';
}
function applyTeamMatchStats(homeName, awayName, homeScore, awayScore, direction) {
  const home = teams.find((team) => team.name === homeName);
  const away = teams.find((team) => team.name === awayName);
  if (!home || !away) return;
  for (const team of [home, away]) team.played = Number(team.played || 0) + direction;
  home.diff = String(Number.parseInt(home.diff, 10) + (homeScore - awayScore) * direction);
  away.diff = String(Number.parseInt(away.diff, 10) + (awayScore - homeScore) * direction);
  if (homeScore > awayScore) { home.wins = Number(home.wins || 0) + direction; away.losses = Number(away.losses || 0) + direction; home.points = Number(home.points || 0) + 3 * direction; }
  else if (homeScore < awayScore) { away.wins = Number(away.wins || 0) + direction; home.losses = Number(home.losses || 0) + direction; away.points = Number(away.points || 0) + 3 * direction; }
  else { home.draws = Number(home.draws || 0) + direction; away.draws = Number(away.draws || 0) + direction; home.points = Number(home.points || 0) + direction; away.points = Number(away.points || 0) + direction; }
}
function setMatchFilter(filter) {
  const activeButton = document.querySelector('.filter.active');
  if (activeButton) activeButton.classList.remove('active');
  const nextButton = document.querySelector(`[data-filter="${filter}"]`);
  if (nextButton) nextButton.classList.add('active');
  renderMatches(filter);
  const calendarPanel = document.getElementById('matches');
  if (calendarPanel) calendarPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function renderScorers() {
  const query = normalizeSearchText($('#player-search')?.value || '');
  const selectedTeam = $('#player-team-filter')?.value || 'all';
  const sortBy = $('#player-sort')?.value || 'goals';
  const rankedScorers = scorers.filter((player) => normalizeSearchText(`${player.name} ${player.team}`).includes(query) && (selectedTeam === 'all' || player.team === selectedTeam)).sort((firstPlayer, secondPlayer) => Number(secondPlayer[sortBy] || 0) - Number(firstPlayer[sortBy] || 0) || firstPlayer.name.localeCompare(secondPlayer.name, 'fr'));
  const totalGoals = scorers.reduce((sum, player) => sum + Number(player.goals || 0), 0);
  const totalAssists = scorers.reduce((sum, player) => sum + Number(player.assists || 0), 0);
  const totalMinutes = scorers.reduce((sum, player) => sum + Number(player.minutes || 0), 0);
  $('#player-count').textContent = scorers.length;
  $('#player-goal-total').textContent = totalGoals;
  $('#player-assist-total').textContent = totalAssists;
  $('#player-minute-total').textContent = totalMinutes.toLocaleString('fr-FR');
  $('#scorer-list').innerHTML = rankedScorers.length ? rankedScorers.map((player, index) => {
    const goalsPerMatch = player.appearances ? (Number(player.goals || 0) / Number(player.appearances)).toFixed(2) : '0.00';
    const initials = player.initials || player.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
    return `<article class="scorer player-stat-row"><span class="scorer-avatar">${initials}</span><div class="scorer-info"><strong>${index + 1}. ${player.name}</strong><small>${player.team}</small><span class="player-metrics"><b>${player.goals} buts</b><b>${player.assists || 0} passes</b><b>${player.appearances || 0} matchs</b><b>${Number(player.minutes || 0).toLocaleString('fr-FR')} min</b><b>${player.yellowCards || 0} 🟨</b><b>${player.redCards || 0} 🟥</b></span></div><span class="scorer-goals">${goalsPerMatch}<small>buts/match</small></span><button class="mini-button" type="button" data-edit-player="${encodeURIComponent(player.name)}">Modifier</button></article>`;
  }).join('') : '<p class="empty-state">Aucun joueur ne correspond à ces critères.</p>';
  const bestOverallScorer = [...scorers].sort((firstPlayer, secondPlayer) => Number(secondPlayer.goals || 0) - Number(firstPlayer.goals || 0))[0];
  if (bestOverallScorer) {
    $('#top-scorer-goals').textContent = bestOverallScorer.goals;
    $('#top-scorer-name').textContent = bestOverallScorer.name;
  }
}
function renderCards() {
  const totalYellow = cards.reduce((sum, card) => sum + Number(card.yellow || 0), 0);
  const totalRed = cards.reduce((sum, card) => sum + Number(card.red || 0), 0);
  const totalCards = totalYellow + totalRed;
  $('#cards-total').textContent = totalCards;
  $('#cards-summary').textContent = `Jaunes ${totalYellow} • Rouges ${totalRed}`;
  $('#cards-list').innerHTML = cards.map((card) => `<div class="card-row"><strong>${card.team}</strong><span>Jaunes ${card.yellow}</span><span>Rouges ${card.red}</span></div>`).join('');
}
function renderStaff() {
  $('#coaches-list').innerHTML = coaches.map((coach) => `<div class="staff-item"><span class="staff-avatar">${coach.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div class="staff-meta"><strong>${coach.name}</strong><small>${coach.team}</small></div><button class="mini-button" type="button" data-edit-coach="${encodeURIComponent(coach.name)}">Modifier</button></div>`).join('');
  $('#referees-list').innerHTML = referees.map((referee) => `<div class="staff-item"><span class="staff-avatar">${referee.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div class="staff-meta"><strong>${referee.name}</strong><small>${referee.level}</small></div><button class="mini-button" type="button" data-edit-referee="${encodeURIComponent(referee.name)}">Modifier</button></div>`).join('');
  const stadiumQuery = ($('#stadium-search')?.value || '').trim().toLocaleLowerCase('fr');
  const stadiumAvailability = $('#stadium-availability-filter')?.value || 'all';
  const visibleStadiums = stadiums.filter((stadium) => (`${stadium.name} ${stadium.city}`).toLocaleLowerCase('fr').includes(stadiumQuery) && (stadiumAvailability === 'all' || (stadium.availability || 'available') === stadiumAvailability));
  $('#stadiums-list').innerHTML = visibleStadiums.length ? visibleStadiums.map((stadium) => `<article class="venue-item"><span class="venue-icon">⚽</span><div class="venue-meta"><strong>${stadium.name}</strong><small>${stadium.city} · ${Number(stadium.capacity).toLocaleString('fr-FR')} places</small><span class="availability-badge ${stadium.availability || 'available'}">${availabilityLabel(stadium.availability)}</span></div><div class="venue-actions"><button class="mini-button" type="button" data-view-stadium="${encodeURIComponent(stadium.name)}">Consulter</button><button class="mini-button" type="button" data-edit-stadium="${encodeURIComponent(stadium.name)}">Modifier</button><button class="mini-button danger-button" type="button" data-delete-stadium="${encodeURIComponent(stadium.name)}">Supprimer</button></div></article>`).join('') : '<p class="empty-state">Aucun stade ne correspond à la recherche.</p>';
  const facilityQuery = ($('#facility-search')?.value || '').trim().toLocaleLowerCase('fr');
  const facilityAvailability = $('#facility-availability-filter')?.value || 'all';
  const visibleFacilities = facilities.filter((facility) => (`${facility.name} ${facility.type} ${facility.location}`).toLocaleLowerCase('fr').includes(facilityQuery) && (facilityAvailability === 'all' || facility.availability === facilityAvailability));
  $('#facilities-list').innerHTML = visibleFacilities.length ? visibleFacilities.map((facility) => `<article class="venue-item"><span class="venue-icon facility-icon">▧</span><div class="venue-meta"><strong>${facility.name}</strong><small>${facility.type} · ${facility.location}</small><span class="availability-badge ${facility.availability}">${availabilityLabel(facility.availability)}</span></div><div class="venue-actions"><button class="mini-button" type="button" data-view-facility="${encodeURIComponent(facility.name)}">Consulter</button><button class="mini-button" type="button" data-edit-facility="${encodeURIComponent(facility.name)}">Modifier</button><button class="mini-button danger-button" type="button" data-delete-facility="${encodeURIComponent(facility.name)}">Supprimer</button></div></article>`).join('') : '<p class="empty-state">Aucune installation ne correspond à la recherche.</p>';
}
function availabilityLabel(value = 'available') { return ({ available: 'Disponible', maintenance: 'En maintenance', unavailable: 'Indisponible' })[value] || 'Disponible'; }
function normalizeSearchText(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr').trim();
}
function searchDashboard(query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];
  const results = [];
  clubs.forEach((club) => {
    if (normalizeSearchText(`${club.name} ${club.city} ${club.country} ${club.league}`).includes(normalizedQuery)) results.push({ type: 'Club', label: club.name, detail: `${club.city} · ${club.league}`, section: 'club-directory', value: club.id });
  });
  teams.forEach((team) => {
    if (!clubs.some((club) => normalizeSearchText(club.name) === normalizeSearchText(team.name)) && normalizeSearchText(`${team.name} ${team.short}`).includes(normalizedQuery)) results.push({ type: 'Équipe', label: team.name, detail: `${team.points} points · ${team.played} matchs joués`, section: 'standings' });
  });
  matches.forEach((match) => {
    const score = Number.isInteger(match.homeScore) ? `${match.homeScore} – ${match.awayScore}` : match.status;
    if (normalizeSearchText(`${match.home} ${match.away} ${match.dateISO || ''} ${score}`).includes(normalizedQuery)) results.push({ type: 'Match', label: `${match.home} — ${match.away}`, detail: `${match.dateISO || ''} · ${score}`, section: 'matches' });
  });
  scorers.forEach((player) => {
    if (normalizeSearchText(`${player.name} ${player.team}`).includes(normalizedQuery)) results.push({ type: 'Buteur', label: player.name, detail: `${player.team} · ${player.goals} buts`, section: 'players' });
  });
  cards.forEach((card) => {
    if (normalizeSearchText(card.team).includes(normalizedQuery)) results.push({ type: 'Cartons', label: card.team, detail: `${card.yellow} jaunes · ${card.red} rouges`, section: 'cards' });
  });
  coaches.forEach((coach) => {
    if (normalizeSearchText(`${coach.name} ${coach.team}`).includes(normalizedQuery)) results.push({ type: 'Entraîneur', label: coach.name, detail: coach.team, section: 'facilities' });
  });
  referees.forEach((referee) => {
    if (normalizeSearchText(`${referee.name} ${referee.level}`).includes(normalizedQuery)) results.push({ type: 'Arbitre', label: referee.name, detail: referee.level, section: 'facilities' });
  });
  stadiums.forEach((stadium) => {
    if (normalizeSearchText(`${stadium.name} ${stadium.city}`).includes(normalizedQuery)) results.push({ type: 'Stade', label: stadium.name, detail: stadium.city, section: 'stadiums', value: stadium.name });
  });
  facilities.forEach((facility) => {
    if (normalizeSearchText(`${facility.name} ${facility.type} ${facility.location}`).includes(normalizedQuery)) results.push({ type: 'Installation', label: facility.name, detail: `${facility.type} · ${facility.location}`, section: 'facilities-list', value: facility.name });
  });
  return results.slice(0, 10);
}
function renderGlobalSearchResults(query) {
  const input = $('#global-search-input');
  const resultsContainer = $('#global-search-results');
  const normalizedQuery = query.trim();
  resultsContainer.replaceChildren();
  if (!normalizedQuery) {
    resultsContainer.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    return;
  }
  const results = searchDashboard(normalizedQuery);
  if (!results.length) {
    const empty = document.createElement('p');
    empty.className = 'global-search-empty';
    empty.textContent = 'Aucun résultat trouvé.';
    resultsContainer.append(empty);
  } else {
    results.forEach((result, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'global-search-result';
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', 'false');
      button.dataset.searchIndex = String(index);
      const icon = document.createElement('span');
      icon.className = 'global-search-result-icon';
      icon.textContent = result.type === 'Match' ? '⚽' : result.type === 'Stade' || result.type === 'Installation' ? '▧' : result.type === 'Buteur' ? '★' : result.type === 'Cartons' ? '▤' : '◉';
      const text = document.createElement('span');
      text.className = 'global-search-result-text';
      const label = document.createElement('strong');
      label.textContent = result.label;
      const detail = document.createElement('small');
      detail.textContent = result.detail;
      text.append(label, detail);
      const type = document.createElement('small');
      type.className = 'global-search-result-type';
      type.textContent = result.type;
      button.append(icon, text, type);
      button.dataset.section = result.section;
      if (result.value) button.dataset.value = result.value;
      resultsContainer.append(button);
    });
  }
  resultsContainer.hidden = false;
  input.setAttribute('aria-expanded', 'true');
}
function selectGlobalSearchResult(button) {
  const section = button.dataset.section;
  if (section === 'club-directory') {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    openClubDetails(clubs.find((club) => club.id === button.dataset.value));
    $('#global-search-results').hidden = true;
    $('#global-search-input').setAttribute('aria-expanded', 'false');
    return;
  }
  if (section === 'stadiums') {
    $('#stadium-search').value = button.dataset.value || '';
    renderStaff();
  } else if (section === 'facilities-list') {
    $('#facility-search').value = button.dataset.value || '';
    renderStaff();
  }
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#global-search-results').hidden = true;
  $('#global-search-input').setAttribute('aria-expanded', 'false');
}
async function loadCardsFromApi() {
  try {
    const response = await fetch('/api/cards');
    if (!response.ok) throw new Error('API indisponible');
    const remoteCards = await response.json();
    if (Array.isArray(remoteCards)) {
      cards.splice(0, cards.length, ...remoteCards);
      renderCards();
    }
  } catch (error) {
    // Les données intégrées restent disponibles si l'API est arrêtée.
  }
}
async function loadScorersFromApi() {
  try {
    const response = await fetch('/api/scorers');
    if (!response.ok) throw new Error('API indisponible');
    const remoteScorers = await response.json();
    if (Array.isArray(remoteScorers)) {
      scorers.splice(0, scorers.length, ...remoteScorers.map((player) => {
        const previous = scorers.find((item) => item.name.toLocaleLowerCase('fr') === player.name.toLocaleLowerCase('fr')) || {};
        const merged = { ...previous, ...player };
        return { ...merged, initials: merged.initials || merged.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(), goals: Number(merged.goals || 0), assists: Number(merged.assists || 0), appearances: Number(merged.appearances || 0), minutes: Number(merged.minutes || 0), yellowCards: Number(merged.yellowCards || 0), redCards: Number(merged.redCards || 0) };
      }));
      window.localStorage.setItem('footboard-scorers', JSON.stringify(scorers));
      renderScorers();
    }
  } catch (error) {
    // Les données intégrées restent disponibles si l'API est arrêtée.
  }
}
async function loadCoachesFromApi() {
  try {
    const response = await fetch('/api/coaches');
    if (!response.ok) throw new Error('API indisponible');
    const remoteCoaches = await response.json();
    if (Array.isArray(remoteCoaches)) {
      coaches.splice(0, coaches.length, ...remoteCoaches);
      renderStaff();
    }
  } catch (error) {
    // On garde la liste locale si l'API est indisponible.
  }
}
async function loadRefereesFromApi() {
  try {
    const response = await fetch('/api/referees');
    if (!response.ok) throw new Error('API indisponible');
    const remoteReferees = await response.json();
    if (Array.isArray(remoteReferees)) {
      referees.splice(0, referees.length, ...remoteReferees);
      renderStaff();
    }
  } catch (error) {
    // On garde la liste locale si l'API est indisponible.
  }
}
async function loadStadiumsFromApi() {
  try {
    const response = await fetch('/api/stadiums');
    if (!response.ok) throw new Error('API indisponible');
    const remoteStadiums = await response.json();
    if (Array.isArray(remoteStadiums)) {
      stadiums.splice(0, stadiums.length, ...remoteStadiums);
      renderStaff();
    }
  } catch (error) {
    // On garde la liste locale si l'API est indisponible.
  }
}
async function loadFacilitiesFromApi() {
  try {
    const response = await fetch('/api/facilities');
    if (!response.ok) throw new Error('API indisponible');
    const remoteFacilities = await response.json();
    if (Array.isArray(remoteFacilities)) facilities.splice(0, facilities.length, ...remoteFacilities);
  } catch (error) {
    // La liste intégrée reste disponible si l'API est arrêtée.
  }
  renderStaff();
}
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2800); }
function saveNotifications() {
  window.localStorage.setItem('footboard-notifications', JSON.stringify(notifications));
  renderNotifications();
}
function setNotificationPanelOpen(isOpen) {
  $('#notifications-panel').hidden = !isOpen;
  $('#notifications-button').setAttribute('aria-expanded', String(isOpen));
}
function addNotification(title, message) {
  if (!settings.notifications) return;
  notifications.unshift({ id: `notification-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title, message, createdAt: new Date().toISOString(), read: false });
  notifications.splice(30);
  saveNotifications();
  setNotificationPanelOpen(true);
}
function renderNotifications() {
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const countBadge = $('#notification-count');
  countBadge.textContent = unreadCount > 99 ? '99+' : String(unreadCount);
  countBadge.hidden = unreadCount === 0;
  $('#notifications-button').setAttribute('aria-label', unreadCount ? `Notifications, ${unreadCount} non lue(s)` : 'Notifications');
  $('#notification-summary').textContent = unreadCount ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}` : 'Tout est à jour';
  const list = $('#notification-list');
  list.replaceChildren();
  for (const notification of notifications) {
    const item = document.createElement('article');
    item.className = `notification-item${notification.read ? ' is-read' : ''}`;
    const content = document.createElement('button');
    content.type = 'button';
    content.className = 'notification-content';
    content.dataset.notificationId = notification.id;
    const title = document.createElement('strong');
    title.textContent = notification.title;
    const message = document.createElement('span');
    message.textContent = notification.message;
    const time = document.createElement('small');
    time.textContent = new Date(notification.createdAt).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    content.append(title, message, time);
    const dismiss = document.createElement('button');
    dismiss.type = 'button';
    dismiss.className = 'notification-dismiss';
    dismiss.dataset.dismissNotification = notification.id;
    dismiss.setAttribute('aria-label', 'Supprimer cette notification');
    dismiss.textContent = '×';
    item.append(content, dismiss);
    list.append(item);
  }
  $('#notification-empty').hidden = notifications.length > 0;
}
function openModal() { $('#match-modal').hidden = false; $('#match-date').value = new Date().toISOString().slice(0, 10); }
function closeModal() { $('#match-modal').hidden = true; }
function openResultModal(match) {
  if (!match) { showToast('Aucun match disponible pour saisir un résultat.'); return; }
  $('#result-form').dataset.matchId = match.id;
  $('#result-match-label').textContent = `${match.home} — ${match.away}`;
  $('#home-score').value = Number.isInteger(match.homeScore) ? match.homeScore : 0;
  $('#away-score').value = Number.isInteger(match.awayScore) ? match.awayScore : 0;
  $('#result-error').textContent = '';
  $('#result-modal').hidden = false;
}
function closeResultModal() { $('#result-modal').hidden = true; $('#result-form').removeAttribute('data-match-id'); }
function openTeamModal() { $('#team-modal').hidden = false; $('#team-name').focus(); }
function closeTeamModal() { $('#team-modal').hidden = true; $('#team-form').reset(); $('#team-error').textContent = ''; }
function openPlayerModal(mode = 'create', existingName = '') {
  const form = $('#player-form');
  const player = scorers.find((item) => item.name.toLocaleLowerCase('fr') === existingName.toLocaleLowerCase('fr'));
  form.dataset.mode = mode;
  form.dataset.originalName = existingName;
  form.querySelector('h2').textContent = mode === 'edit' ? 'Modifier les statistiques' : 'Ajouter un joueur';
  form.querySelector('button[type="submit"]').innerHTML = mode === 'edit' ? 'Enregistrer les statistiques <span>→</span>' : 'Enregistrer les statistiques <span>→</span>';
  if (player) {
    $('#player-name').value = player.name;
    $('#player-team').value = player.team;
    $('#player-goals').value = player.goals || 0;
    $('#player-assists').value = player.assists || 0;
    $('#player-appearances').value = player.appearances || 0;
    $('#player-minutes').value = player.minutes || 0;
    $('#player-yellow-cards').value = player.yellowCards || 0;
    $('#player-red-cards').value = player.redCards || 0;
  } else {
    form.reset();
    $('#player-goals').value = 0;
    $('#player-assists').value = 0;
    $('#player-appearances').value = 0;
    $('#player-minutes').value = 0;
    $('#player-yellow-cards').value = 0;
    $('#player-red-cards').value = 0;
  }
  $('#player-error').textContent = '';
  $('#player-modal').hidden = false;
  $('#player-name').focus();
}
function closePlayerModal() { $('#player-modal').hidden = true; $('#player-form').reset(); $('#player-form').removeAttribute('data-mode'); $('#player-form').removeAttribute('data-original-name'); $('#player-error').textContent = ''; }
function openCardModal() { $('#card-modal').hidden = false; $('#card-team').focus(); }
function closeCardModal() { $('#card-modal').hidden = true; $('#card-form').reset(); $('#card-error').textContent = ''; }
function openCoachModal(mode = 'create', existingName = '') {
  $('#coach-modal').hidden = false;
  const form = $('#coach-form');
  const submitButton = form.querySelector('button[type="submit"]');
  form.dataset.mode = mode;
  form.dataset.originalName = existingName || '';
  if (mode === 'edit') {
    const coach = coaches.find((item) => item.name.toLowerCase() === existingName.toLowerCase());
    if (coach) {
      $('#coach-name').value = coach.name;
      $('#coach-team').value = coach.team;
    }
    submitButton.innerHTML = 'Enregistrer les changements <span>→</span>';
  } else {
    form.reset();
    submitButton.innerHTML = 'Ajouter l\'entraîneur <span>→</span>';
  }
  $('#coach-name').focus();
}
function closeCoachModal() { $('#coach-modal').hidden = true; $('#coach-form').reset(); $('#coach-form').removeAttribute('data-mode'); $('#coach-form').removeAttribute('data-original-name'); $('#coach-error').textContent = ''; const button = $('#coach-form button[type="submit"]'); button.innerHTML = 'Ajouter l\'entraîneur <span>→</span>'; }
function openRefereeModal(mode = 'create', existingName = '') {
  $('#referee-modal').hidden = false;
  const form = $('#referee-form');
  const submitButton = form.querySelector('button[type="submit"]');
  form.dataset.mode = mode;
  form.dataset.originalName = existingName || '';
  if (mode === 'edit') {
    const referee = referees.find((item) => item.name.toLowerCase() === existingName.toLowerCase());
    if (referee) {
      $('#referee-name').value = referee.name;
      $('#referee-level').value = referee.level;
    }
    submitButton.innerHTML = 'Enregistrer les changements <span>→</span>';
  } else {
    form.reset();
    submitButton.innerHTML = 'Ajouter l\'arbitre <span>→</span>';
  }
  $('#referee-name').focus();
}
function closeRefereeModal() { $('#referee-modal').hidden = true; $('#referee-form').reset(); $('#referee-form').removeAttribute('data-mode'); $('#referee-form').removeAttribute('data-original-name'); $('#referee-error').textContent = ''; const button = $('#referee-form button[type="submit"]'); button.innerHTML = 'Ajouter l\'arbitre <span>→</span>'; }
function openStadiumModal(mode = 'create', existingName = '') {
  $('#stadium-modal').hidden = false;
  const form = $('#stadium-form');
  const submitButton = form.querySelector('button[type="submit"]');
  form.dataset.mode = mode;
  form.dataset.originalName = existingName || '';
  if (mode === 'edit') {
    const stadium = stadiums.find((item) => item.name.toLowerCase() === existingName.toLowerCase());
    if (stadium) {
      $('#stadium-name').value = stadium.name;
      $('#stadium-city').value = stadium.city;
      $('#stadium-capacity').value = stadium.capacity;
      $('#stadium-availability').value = stadium.availability || 'available';
    }
    submitButton.innerHTML = 'Enregistrer les changements <span>→</span>';
  } else {
    form.reset();
    submitButton.innerHTML = 'Ajouter le stade <span>→</span>';
  }
  $('#stadium-name').focus();
}
function closeStadiumModal() { $('#stadium-modal').hidden = true; $('#stadium-form').reset(); $('#stadium-form').removeAttribute('data-mode'); $('#stadium-form').removeAttribute('data-original-name'); $('#stadium-error').textContent = ''; const button = $('#stadium-form button[type="submit"]'); button.innerHTML = 'Ajouter le stade <span>→</span>'; }
function openFacilityModal(mode = 'create', existingName = '') {
  $('#facility-modal').hidden = false;
  const form = $('#facility-form');
  form.dataset.mode = mode;
  form.dataset.originalName = existingName;
  const facility = facilities.find((item) => item.name.toLocaleLowerCase('fr') === existingName.toLocaleLowerCase('fr'));
  if (mode === 'edit' && facility) {
    $('#facility-name').value = facility.name;
    $('#facility-type').value = facility.type;
    $('#facility-location').value = facility.location;
    $('#facility-availability').value = facility.availability;
    form.querySelector('h2').textContent = 'Modifier une installation';
    form.querySelector('button[type="submit"]').innerHTML = 'Enregistrer les changements <span>→</span>';
  } else {
    form.reset();
    form.querySelector('h2').textContent = 'Ajouter une installation';
    form.querySelector('button[type="submit"]').innerHTML = 'Ajouter l\'installation <span>→</span>';
  }
  $('#facility-name').focus();
}
function closeFacilityModal() { $('#facility-modal').hidden = true; $('#facility-form').reset(); $('#facility-form').removeAttribute('data-mode'); $('#facility-form').removeAttribute('data-original-name'); $('#facility-error').textContent = ''; }
function showVenueDetails(kind, item) {
  const isStadium = kind === 'Stade';
  $('#venue-details-kind').textContent = isStadium ? 'DÉTAILS DU STADE' : 'DÉTAILS DE L’INSTALLATION';
  $('#venue-details-title').textContent = item.name;
  const details = isStadium ? [['Ville', item.city], ['Capacité', `${Number(item.capacity).toLocaleString('fr-FR')} places`]] : [['Type', item.type], ['Emplacement', item.location]];
  details.push(['Disponibilité', availabilityLabel(item.availability)]);
  $('#venue-details-content').innerHTML = details.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
  $('#venue-details-modal').hidden = false;
}
function closeVenueDetails() { $('#venue-details-modal').hidden = true; }
function updateConnectedProfile(account) {
  const profile = $('.profile');
  const displayName = account?.name?.trim() || 'Administrateur';
  profile.querySelector('strong').textContent = displayName;
  profile.setAttribute('aria-label', `Profil de ${displayName}`);
  profile.querySelector('.person-avatar').setAttribute('aria-label', `Profil de ${displayName}`);
  const panelName = $('#profile-panel-name');
  const panelEmail = $('#profile-panel-email');
  if (panelName) panelName.textContent = displayName;
  if (panelEmail) panelEmail.textContent = account?.email || 'Compte administrateur';
}
function toggleProfileMenu(forceOpen) {
  const profile = $('.profile');
  const panel = $('#profile-panel');
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : panel.hidden;
  panel.hidden = !shouldOpen;
  profile.setAttribute('aria-expanded', String(shouldOpen));
}
function applySettingsPreferences() {
  $('.app-shell').classList.toggle('dark-theme', settings.theme === 'dark');
  $('.app-shell').classList.toggle('compact-view', Boolean(settings.compact));
  const themeToggle = $('#theme-toggle-button');
  if (themeToggle) {
    themeToggle.textContent = settings.theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', settings.theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');
    themeToggle.title = settings.theme === 'dark' ? 'Mode clair' : 'Mode sombre';
  }
  applyLanguage(settings.language);
  $('.breadcrumb span').textContent = settings.competition;
  $('.brand small').textContent = `SAISON ${settings.season}`;
  $('#standings .eyebrow').textContent = `SAISON ${settings.season}`;
}
function applyLanguage(language = 'fr') {
  const dictionaries = {
    fr: {
      navLabels: ['Gestion', 'Ressources', 'Système'], nav: ['Vue d’ensemble', 'Matchs', 'Classement', 'Clubs', 'Joueurs', 'Stades', 'Installations', 'Entraîneurs', 'Arbitres', 'Paramètres'],
      stats: ['Matchs joués', 'Buts inscrits', 'Joueurs actifs', 'Cartons distribués', 'Meilleur buteur'], sections: ['Clubs emblématiques', 'Classement général', 'Pronostic du titre', 'Calendrier', 'Statistiques des joueurs', 'Cartons', 'Actions fréquentes', 'Entraîneurs', 'Arbitres', 'Paramètres'],
      greeting: 'Bonjour ', matchAdd: '＋ Ajouter un match', allMatches: 'Tout voir →', filters: ['Tous', 'Aujourd’hui', 'Cette semaine'], addCard: 'Ajouter un carton →', addTeam: 'Nouvelle équipe', registerPlayer: 'Inscrire un joueur', recordResult: 'Enregistrer un résultat', coaches: 'Ajouter un entraîneur →', referees: 'Ajouter un arbitre →', addStadium: '＋ Ajouter un stade', addFacility: '＋ Ajouter une installation', venues: ['Stades', 'Installations'], settingsIntro: 'Personnalisez votre compte et l’affichage du tableau de bord.', groups: ['Compte', 'Championnat', 'Affichage', 'Notifications'], labels: ['Nom affiché', 'Adresse e-mail', 'Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le nouveau mot de passe', 'Nom du championnat', 'Saison', 'Mode d’affichage', 'Langue'], themeOptions: ['Clair', 'Sombre'], compact: 'Affichage compact', compactHint: 'Réduire l’espacement des panneaux', notifications: 'Activer les notifications', notificationsHint: 'Recevoir les alertes de matchs et de résultats', save: 'Enregistrer les paramètres ', saved: 'Paramètres enregistrés.'
    },
    en: {
      navLabels: ['Management', 'Resources', 'System'], nav: ['Overview', 'Matches', 'Standings', 'Clubs', 'Players', 'Stadiums', 'Facilities', 'Coaches', 'Referees', 'Settings'],
      stats: ['Matches played', 'Goals scored', 'Active players', 'Cards issued', 'Top scorer'], sections: ['Featured clubs', 'League standings', 'Title prediction', 'Calendar', 'Player statistics', 'Cards', 'Quick actions', 'Coaches', 'Referees', 'Settings'],
      greeting: 'Hello ', matchAdd: '＋ Add a match', allMatches: 'View all →', filters: ['All', 'Today', 'This week'], addCard: 'Add a card →', addTeam: 'New team', registerPlayer: 'Register a player', recordResult: 'Record a result', coaches: 'Add a coach →', referees: 'Add a referee →', addStadium: '＋ Add a stadium', addFacility: '＋ Add a facility', venues: ['Stadiums', 'Facilities'], settingsIntro: 'Customize your account and dashboard display.', groups: ['Account', 'Competition', 'Appearance', 'Notifications'], labels: ['Display name', 'Email address', 'Current password', 'New password', 'Confirm new password', 'Competition name', 'Season', 'Display mode', 'Language'], themeOptions: ['Light', 'Dark'], compact: 'Compact layout', compactHint: 'Reduce spacing between panels', notifications: 'Enable notifications', notificationsHint: 'Receive match and result alerts', save: 'Save settings ', saved: 'Settings saved.'
    },
    ar: {
      navLabels: ['الإدارة', 'الموارد', 'النظام'], nav: ['نظرة عامة', 'المباريات', 'الترتيب', 'الأندية', 'اللاعبون', 'الملاعب', 'المنشآت', 'المدربون', 'الحكام', 'الإعدادات'],
      stats: ['المباريات الملعوبة', 'الأهداف المسجلة', 'اللاعبون النشطون', 'البطاقات', 'أفضل هداف'], sections: ['الأندية البارزة', 'ترتيب الدوري', 'توقع البطل', 'الجدول', 'إحصائيات اللاعبين', 'البطاقات', 'إجراءات سريعة', 'المدربون', 'الحكام', 'الإعدادات'],
      greeting: 'مرحبًا ', matchAdd: '＋ إضافة مباراة', allMatches: 'عرض الكل ←', filters: ['الكل', 'اليوم', 'هذا الأسبوع'], addCard: 'إضافة بطاقة ←', addTeam: 'فريق جديد', registerPlayer: 'تسجيل لاعب', recordResult: 'تسجيل نتيجة', coaches: 'إضافة مدرب ←', referees: 'إضافة حكم ←', addStadium: '＋ إضافة ملعب', addFacility: '＋ إضافة منشأة', venues: ['الملاعب', 'المنشآت'], settingsIntro: 'خصص حسابك وطريقة عرض لوحة التحكم.', groups: ['الحساب', 'البطولة', 'المظهر', 'الإشعارات'], labels: ['الاسم المعروض', 'البريد الإلكتروني', 'كلمة المرور الحالية', 'كلمة المرور الجديدة', 'تأكيد كلمة المرور الجديدة', 'اسم البطولة', 'الموسم', 'وضع العرض', 'اللغة'], themeOptions: ['فاتح', 'داكن'], compact: 'عرض مضغوط', compactHint: 'تقليل المسافات بين اللوحات', notifications: 'تفعيل الإشعارات', notificationsHint: 'تلقي تنبيهات المباريات والنتائج', save: 'حفظ الإعدادات ', saved: 'تم حفظ الإعدادات.'
    }
  };
  const dictionary = dictionaries[language] || dictionaries.fr;
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  const setTexts = (selector, values) => document.querySelectorAll(selector).forEach((element, index) => {
    const text = values[index] ?? values[values.length - 1];
    if (text === undefined) return;
    const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.textContent = text;
    else element.prepend(document.createTextNode(text));
  });
  setTexts('.nav-label', dictionary.navLabels);
  setTexts('.nav-link', dictionary.nav);
  setTexts('.stat-card p', dictionary.stats);
  setTexts('.content-grid .panel-heading h2', dictionary.sections);
  setTexts('.page-heading h1', [dictionary.greeting]);
  setTexts('.page-heading .subheading', language === 'en' ? ['Here is what is happening in your championship today.'] : language === 'ar' ? ['إليك آخر مستجدات البطولة اليوم.'] : ["Voici ce qui se passe dans votre championnat aujourd'hui."]);
  setTexts('#add-match-button', [dictionary.matchAdd]);
  setTexts('#all-matches-button', [dictionary.allMatches]);
  setTexts('.match-filter .filter', dictionary.filters);
  setTexts('#add-card-button', [dictionary.addCard]);
  setTexts('#add-player-button', [language === 'en' ? '＋ Add player' : language === 'ar' ? '＋ إضافة لاعب' : '＋ Ajouter un joueur']);
  setTexts('.player-stat-summary span', language === 'en' ? ['Players tracked', 'Goals', 'Assists', 'Minutes played'] : language === 'ar' ? ['اللاعبون المسجلون', 'الأهداف', 'التمريرات الحاسمة', 'دقائق اللعب'] : ['Joueurs suivis', 'Buts', 'Passes décisives', 'Minutes jouées']);
  setTexts('#players .player-stat-controls label', language === 'en' ? ['Search player', 'Team', 'Sort by'] : language === 'ar' ? ['بحث عن لاعب', 'الفريق', 'ترتيب حسب'] : ['Rechercher un joueur', 'Équipe', 'Trier par']);
  setTexts('#add-team-button strong', [dictionary.addTeam]);
  setTexts('.quick-actions button:nth-child(2) strong', [dictionary.registerPlayer]);
  setTexts('#quick-result-button strong', [dictionary.recordResult]);
  setTexts('#add-coach-button', [dictionary.coaches]);
  setTexts('#add-referee-button', [dictionary.referees]);
  setTexts('#add-stadium-button', [dictionary.addStadium]);
  setTexts('#add-facility-button', [dictionary.addFacility]);
  setTexts('.venue-panel h3', dictionary.venues);
  setTexts('.settings-intro', [dictionary.settingsIntro]);
  setTexts('.settings-group legend', dictionary.groups);
  setTexts('#settings-form label[for]', dictionary.labels);
  setTexts('#settings-compact + span strong', [dictionary.compact]);
  setTexts('#settings-compact + span small', [dictionary.compactHint]);
  setTexts('#settings-notifications + span strong', [dictionary.notifications]);
  setTexts('#settings-notifications + span small', [dictionary.notificationsHint]);
  setTexts('#settings-form button[type="submit"]', [dictionary.save]);
  const themeLabels = language === 'en' ? ['Light', 'Dark'] : language === 'ar' ? ['فاتح', 'داكن'] : ['Clair', 'Sombre'];
  $('#settings-theme').querySelectorAll('option').forEach((option, index) => { option.textContent = themeLabels[index]; });
  const competition = $('#settings-competition');
  competition.placeholder = language === 'en' ? 'National championship' : language === 'ar' ? 'البطولة الوطنية' : 'Championnat national';
}
function populateSettingsForm(account) {
  $('#settings-name').value = account?.name || 'Administrateur';
  $('#settings-email').value = account?.email || '';
  $('#settings-current-password').value = '';
  $('#settings-new-password').value = '';
  $('#settings-confirm-password').value = '';
  $('#settings-competition').value = settings.competition;
  $('#settings-season').value = settings.season;
  $('#settings-theme').value = settings.theme;
  $('#settings-language').value = settings.language || 'fr';
  $('#settings-compact').checked = Boolean(settings.compact);
  $('#settings-notifications').checked = Boolean(settings.notifications);
}
function enterDashboard() {
  $('#login-screen').classList.add('logged-in');
  window.setTimeout(() => { $('#login-screen').hidden = true; }, 420);
}
document.addEventListener('DOMContentLoaded', () => {
  const originalStaffPanel = $('.staff-panel');
  const staffParent = originalStaffPanel.parentElement;
  const resourcePanels = [
    { id: 'coaches', title: 'Entraîneurs', list: $('#coaches-list'), button: $('#add-coach-button') },
    { id: 'referees', title: 'Arbitres', list: $('#referees-list'), button: $('#add-referee-button') }
  ];
  resourcePanels.forEach(({ id, title, list, button }) => {
    const panel = document.createElement('section');
    const heading = document.createElement('div');
    const titleElement = document.createElement('h2');
    panel.className = 'panel staff-section';
    panel.id = id;
    panel.setAttribute('aria-labelledby', `${id}-title`);
    heading.className = 'panel-heading';
    titleElement.id = `${id}-title`;
    titleElement.textContent = title;
    heading.append(titleElement, button);
    panel.append(heading, list);
    staffParent.insertBefore(panel, originalStaffPanel);
  });
  originalStaffPanel.querySelectorAll('.venue-section').forEach((panel) => {
    const isStadiums = Boolean(panel.querySelector('#stadiums-list'));
    const id = isStadiums ? 'stadiums' : 'facilities';
    panel.classList.add('panel', 'venue-panel');
    panel.id = id;
    panel.setAttribute('aria-labelledby', `${id}-title`);
    const title = panel.querySelector('h3');
    title.id = `${id}-title`;
    panel.querySelector('.venue-heading').classList.add('panel-heading');
    staffParent.insertBefore(panel, originalStaffPanel);
  });
  originalStaffPanel.remove();

  const loginForm = $('#login-form');
  const loginScreen = $('#login-screen');
  const loginError = $('#login-error');
  const resetPasswordForm = $('#reset-password-form');
  const resetError = $('#reset-error');
  const newPasswordForm = $('#new-password-form');
  const newPasswordError = $('#new-password-error');
  const resetToken = new URLSearchParams(window.location.search).get('reset');

  const showLoginView = () => {
    loginForm.hidden = false;
    resetPasswordForm.hidden = true;
    newPasswordForm.hidden = true;
    loginError.textContent = '';
    resetError.textContent = '';
    newPasswordError.textContent = '';
    newPasswordError.classList.remove('login-success');
    newPasswordError.classList.add('login-error');
  };

  const showResetView = () => {
    loginForm.hidden = true;
    resetPasswordForm.hidden = false;
    newPasswordForm.hidden = true;
    loginError.textContent = '';
    resetError.textContent = '';
    newPasswordError.textContent = '';
    newPasswordError.classList.remove('login-success');
    newPasswordError.classList.add('login-error');
  };

  const showNewPasswordView = (token) => {
    loginForm.hidden = true;
    resetPasswordForm.hidden = true;
    newPasswordForm.hidden = false;
    $('#new-password-token').value = token;
    loginError.textContent = '';
    resetError.textContent = '';
    newPasswordError.textContent = '';
    newPasswordError.classList.remove('login-success');
    newPasswordError.classList.add('login-error');
  };

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = $('#login-email').value.trim().toLowerCase();
    const password = $('#login-password').value;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const payload = await response.json();
      if (!response.ok) {
        loginError.textContent = payload.error || 'Identifiants invalides.';
        return;
      }
      const account = payload.user;
      writeStoredAuth({ token: payload.token });
      window.localStorage.setItem('footboard-account', JSON.stringify(account));
      loginError.textContent = '';
      updateConnectedProfile(account);
      enterDashboard();
    } catch (error) {
      loginError.textContent = 'Impossible de contacter le serveur d’authentification.';
    }
  });
  resetPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = $('#reset-email').value.trim().toLowerCase();
    if (!email) {
      resetError.textContent = 'Saisissez une adresse e-mail valide.';
      return;
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const payload = await response.json();
      resetError.textContent = payload.message || 'Une demande de réinitialisation a bien été enregistrée.';
      resetError.classList.remove('login-error');
      resetError.classList.add('login-success');
      resetPasswordForm.reset();
    } catch (error) {
      resetError.classList.remove('login-success');
      resetError.classList.add('login-error');
      resetError.textContent = 'Impossible d’envoyer le lien pour le moment.';
    }
  });
  newPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = $('#new-password-token').value;
    const password = $('#new-password').value;
    const confirmation = $('#new-password-confirm').value;

    if (password.length < 6) {
      newPasswordError.classList.remove('login-success');
      newPasswordError.classList.add('login-error');
      newPasswordError.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }
    if (password !== confirmation) {
      newPasswordError.classList.remove('login-success');
      newPasswordError.classList.add('login-error');
      newPasswordError.textContent = 'Les deux mots de passe ne correspondent pas.';
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const payload = await response.json();
      if (!response.ok) {
        newPasswordError.classList.remove('login-success');
        newPasswordError.classList.add('login-error');
        newPasswordError.textContent = payload.error || 'Le lien de réinitialisation est invalide.';
        return;
      }
      newPasswordError.classList.remove('login-error');
      newPasswordError.classList.add('login-success');
      newPasswordError.textContent = payload.message || 'Votre mot de passe a bien été modifié.';
      window.setTimeout(() => {
        showLoginView();
        loginError.textContent = 'Votre mot de passe a été modifié avec succès.';
        loginForm.reset();
      }, 1500);
    } catch (error) {
      newPasswordError.classList.remove('login-success');
      newPasswordError.classList.add('login-error');
      newPasswordError.textContent = 'Impossible de réinitialiser le mot de passe pour le moment.';
    }
  });
  $('#toggle-password').addEventListener('click', () => {
    const passwordInput = $('#login-password');
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    $('#toggle-password').textContent = isPassword ? 'Masquer' : 'Voir';
  });
  $('#forgot-password').addEventListener('click', (event) => {
    event.preventDefault();
    showResetView();
  });
  if (resetToken) {
    showNewPasswordView(resetToken);
  }
  const profile = $('.profile');
  profile.setAttribute('role', 'button');
  profile.setAttribute('tabindex', '0');
  profile.setAttribute('aria-haspopup', 'true');
  profile.setAttribute('aria-expanded', 'false');
  const profilePanel = document.createElement('section');
  profilePanel.className = 'profile-panel';
  profilePanel.id = 'profile-panel';
  profilePanel.setAttribute('aria-label', 'Options du profil');
  profilePanel.hidden = true;
  profilePanel.innerHTML = '<div class="profile-panel-info"><strong id="profile-panel-name">Administrateur</strong><small id="profile-panel-email">Compte administrateur</small></div><button class="profile-logout" id="profile-logout" type="button">Se déconnecter <span aria-hidden="true">↗</span></button>';
  profile.append(profilePanel);
  profile.addEventListener('click', (event) => {
    if (event.target.closest('#profile-logout')) return;
    toggleProfileMenu();
  });
  profile.addEventListener('keydown', (event) => {
    if (event.target.closest('#profile-logout')) return;
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleProfileMenu(); }
  });
  $('#profile-logout').addEventListener('click', () => {
    toggleProfileMenu(false);
    clearStoredAuth();
    loginScreen.hidden = false;
    loginScreen.classList.remove('logged-in');
    $('#login-password').value = '';
    loginError.textContent = '';
    $('.profile').focus();
  });
  document.addEventListener('click', (event) => { if (!event.target.closest('.profile')) toggleProfileMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleProfileMenu(false); });
  const restoreSession = async () => {
    const auth = readStoredAuth();
    if (!auth?.token) return;
    try {
      const response = await fetch('/api/auth/me', {
        headers: getAuthorizationHeaders()
      });
      if (!response.ok) {
        clearStoredAuth();
        return;
      }
      const payload = await response.json();
      const account = payload.user;
      window.localStorage.setItem('footboard-account', JSON.stringify(account));
      updateConnectedProfile(account);
      populateSettingsForm(account);
      enterDashboard();
    } catch (error) {
      clearStoredAuth();
    }
  };
  const account = JSON.parse(window.localStorage.getItem('footboard-account') || 'null');
  if (account) {
    updateConnectedProfile(account);
    populateSettingsForm(account);
  }
  restoreSession();
  applySettingsPreferences();
  const settingsForm = $('#settings-form');
  const settingsToggle = $('#settings-toggle-button');
  const themeToggle = $('#theme-toggle-button');
  const setSettingsExpanded = (expanded) => {
    settingsForm.hidden = !expanded;
    settingsToggle.setAttribute('aria-expanded', String(expanded));
    settingsToggle.textContent = expanded ? 'Réduire les paramètres ↑' : 'Ouvrir les paramètres ↓';
  };
  setSettingsExpanded(false);
  settingsToggle.addEventListener('click', () => setSettingsExpanded(settingsForm.hidden));
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      settings.theme = settings.theme === 'dark' ? 'light' : 'dark';
      if ($('#settings-theme')) $('#settings-theme').value = settings.theme;
      window.localStorage.setItem('footboard-settings', JSON.stringify(settings));
      applySettingsPreferences();
    });
  }
  const updateLiveSettings = () => {
    const nextCompetition = $('#settings-competition').value.trim() || defaultSettings.competition;
    const nextSeason = $('#settings-season').value.trim() || defaultSettings.season;
    settings.competition = nextCompetition;
    settings.season = nextSeason;
    settings.theme = $('#settings-theme').value || 'light';
    settings.language = $('#settings-language').value || 'fr';
    settings.compact = $('#settings-compact').checked;
    settings.notifications = $('#settings-notifications').checked;
    window.localStorage.setItem('footboard-settings', JSON.stringify(settings));
    applySettingsPreferences();
  };
  settingsForm.addEventListener('input', updateLiveSettings);
  settingsForm.addEventListener('change', updateLiveSettings);
  $('#settings-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const updatedAccount = JSON.parse(window.localStorage.getItem('footboard-account') || 'null') || {};
    const nextName = $('#settings-name').value.trim();
    const nextCompetition = $('#settings-competition').value.trim();
    const nextSeason = $('#settings-season').value.trim();
    const currentPassword = $('#settings-current-password').value;
    const newPassword = $('#settings-new-password').value;
    const confirmPassword = $('#settings-confirm-password').value;
    const nextEmail = $('#settings-email').value.trim().toLowerCase();
    const isChangingCredentials = nextEmail !== (updatedAccount.email || '') || Boolean(newPassword);
    const status = $('#settings-status');
    if (!nextName || !nextEmail || !nextCompetition || !nextSeason) {
      status.textContent = 'Renseignez le nom, l’adresse e-mail, le championnat et la saison.';
      status.classList.add('settings-error');
      return;
    }
    if (isChangingCredentials && currentPassword !== updatedAccount.password) {
      status.textContent = 'Le mot de passe actuel est incorrect.';
      status.classList.add('settings-error');
      return;
    }
    if (newPassword && newPassword.length < 6) {
      status.textContent = 'Le nouveau mot de passe doit contenir au moins 6 caractères.';
      status.classList.add('settings-error');
      return;
    }
    if (newPassword !== confirmPassword) {
      status.textContent = 'La confirmation du nouveau mot de passe ne correspond pas.';
      status.classList.add('settings-error');
      return;
    }
    updatedAccount.name = nextName;
    updatedAccount.email = nextEmail;
    if (newPassword) updatedAccount.password = newPassword;
    settings.competition = nextCompetition;
    settings.season = nextSeason;
    settings.theme = $('#settings-theme').value;
    settings.language = $('#settings-language').value;
    settings.compact = $('#settings-compact').checked;
    settings.notifications = $('#settings-notifications').checked;
    window.localStorage.setItem('footboard-account', JSON.stringify(updatedAccount));
    window.localStorage.setItem('footboard-settings', JSON.stringify(settings));
    updateConnectedProfile(updatedAccount);
    applySettingsPreferences();
    status.classList.remove('settings-error');
    status.textContent = settings.language === 'en' ? 'Settings saved.' : settings.language === 'ar' ? 'تم حفظ الإعدادات.' : 'Paramètres enregistrés.';
    populateSettingsForm(updatedAccount);
    showToast('Vos paramètres ont été enregistrés.');
  });
  $('#settings-form').addEventListener('input', () => {
    $('#settings-status').textContent = '';
    $('#settings-status').classList.remove('settings-error');
  });
  renderClubDirectory(); renderStandings(); renderTeamOptions(); renderMatches(); renderScorers(); renderStaff(); renderCards(); renderNotifications(); loadTeamsFromApi(); loadMatchesFromApi(); loadScorersFromApi(); loadCoachesFromApi(); loadRefereesFromApi(); loadStadiumsFromApi(); loadFacilitiesFromApi(); loadCardsFromApi();
  $('#global-search-input').addEventListener('input', (event) => renderGlobalSearchResults(event.target.value));
  $('#global-search-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const firstResult = $('#global-search-results .global-search-result');
      if (firstResult) { event.preventDefault(); selectGlobalSearchResult(firstResult); }
    }
    if (event.key === 'Escape') {
      $('#global-search-results').hidden = true;
      $('#global-search-input').setAttribute('aria-expanded', 'false');
    }
  });
  $('#global-search-results').addEventListener('click', (event) => {
    const result = event.target.closest('.global-search-result');
    if (result) selectGlobalSearchResult(result);
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.global-search')) {
      $('#global-search-results').hidden = true;
      $('#global-search-input').setAttribute('aria-expanded', 'false');
    }
  });
  $('#notifications-button').addEventListener('click', () => {
    setNotificationPanelOpen($('#notifications-panel').hidden);
  });
  $('#mark-notifications-read').addEventListener('click', () => {
    notifications.forEach((notification) => { notification.read = true; });
    saveNotifications();
  });
  $('#notification-list').addEventListener('click', (event) => {
    const dismissButton = event.target.closest('[data-dismiss-notification]');
    if (dismissButton) {
      const index = notifications.findIndex((notification) => notification.id === dismissButton.dataset.dismissNotification);
      if (index >= 0) notifications.splice(index, 1);
      saveNotifications();
      return;
    }
    const notificationButton = event.target.closest('[data-notification-id]');
    if (notificationButton) {
      const notification = notifications.find((item) => item.id === notificationButton.dataset.notificationId);
      if (notification) { notification.read = true; saveNotifications(); }
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.notification-center')) {
      setNotificationPanelOpen(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNotificationPanelOpen(false);
  });
  document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => setMatchFilter(button.dataset.filter || 'all')));
  $('#add-match-button').addEventListener('click', openModal); $('#all-matches-button').addEventListener('click', () => setMatchFilter('all'));
  $('#match-modal').addEventListener('click', (event) => { if (event.target.id === 'match-modal' || event.target.classList.contains('modal-close')) closeModal(); });
  $('#match-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const home = $('#home-team').value;
    const away = $('#away-team').value;
    const dateISO = $('#match-date').value;
    if (home === away) { $('#match-error').textContent = 'Les deux équipes doivent être différentes.'; return; }
    try {
      const response = await fetch('/api/matches', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ home, away, dateISO }) });
      const result = await response.json();
      if (!response.ok) { $('#match-error').textContent = result.error || 'Impossible de programmer ce match.'; return; }
      matches.push(result);
    } catch (error) {
      const date = new Date(`${dateISO}T12:00:00`);
      matches.push({ id: `local-${Date.now()}`, home, away, dateISO, day: date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase(), date: date.toLocaleDateString('fr-FR', { day: '2-digit' }), month: date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase(), status: 'Programmé', type: 'week' });
      window.localStorage.setItem('footboard-matches', JSON.stringify(matches));
    }
    renderMatches('all'); closeModal(); showToast('Match ajouté au calendrier avec succès.'); addNotification('Match programmé', `${home} contre ${away} · ${new Date(`${dateISO}T12:00:00`).toLocaleDateString('fr-FR')}.`);
  });
  $('#add-player-button').addEventListener('click', () => openPlayerModal());
  $('#register-player-button').addEventListener('click', () => openPlayerModal());
  $('#player-modal').addEventListener('click', (event) => { if (event.target.id === 'player-modal' || event.target.classList.contains('modal-close')) closePlayerModal(); });
  $('#player-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = $('#player-name').value.trim();
    const team = $('#player-team').value;
    const player = {
      name,
      team,
      goals: Number($('#player-goals').value),
      assists: Number($('#player-assists').value),
      appearances: Number($('#player-appearances').value),
      minutes: Number($('#player-minutes').value),
      yellowCards: Number($('#player-yellow-cards').value),
      redCards: Number($('#player-red-cards').value)
    };
    if (!name || !team) { $('#player-error').textContent = 'Le nom et l’équipe sont obligatoires.'; return; }
    if (![player.goals, player.assists, player.appearances, player.minutes, player.yellowCards, player.redCards].every((value) => Number.isInteger(value) && value >= 0)) {
      $('#player-error').textContent = 'Les statistiques doivent être des nombres entiers positifs.';
      return;
    }
    const isEditMode = $('#player-form').dataset.mode === 'edit';
    const originalName = $('#player-form').dataset.originalName || '';
    const duplicate = scorers.some((item) => item.name.toLocaleLowerCase('fr') === name.toLocaleLowerCase('fr') && item.name.toLocaleLowerCase('fr') !== originalName.toLocaleLowerCase('fr'));
    if (duplicate) { $('#player-error').textContent = 'Un joueur porte déjà ce nom.'; return; }
    player.initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
    try {
      const response = await fetch(isEditMode ? `/api/scorers/${encodeURIComponent(originalName)}` : '/api/scorers', { method: isEditMode ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(player) });
      const result = await response.json();
      if (!response.ok) { $('#player-error').textContent = result.error || 'Impossible d’enregistrer ces statistiques.'; return; }
      if (isEditMode) { const index = scorers.findIndex((item) => item.name.toLocaleLowerCase('fr') === originalName.toLocaleLowerCase('fr')); if (index >= 0) scorers[index] = result; }
      else scorers.push(result);
    } catch (error) {
      if (isEditMode) { const index = scorers.findIndex((item) => item.name.toLocaleLowerCase('fr') === originalName.toLocaleLowerCase('fr')); if (index >= 0) scorers[index] = player; }
      else scorers.push(player);
    }
    window.localStorage.setItem('footboard-scorers', JSON.stringify(scorers));
    renderScorers(); closePlayerModal(); showToast(isEditMode ? `Statistiques de ${name} modifiées.` : `${name} a été ajouté aux statistiques.`);
  });
  $('#player-search').addEventListener('input', renderScorers);
  $('#player-team-filter').addEventListener('change', renderScorers);
  $('#player-sort').addEventListener('change', renderScorers);
  $('#scorer-list').addEventListener('click', (event) => {
    const editButton = event.target.closest('[data-edit-player]');
    if (editButton) openPlayerModal('edit', decodeURIComponent(editButton.dataset.editPlayer));
  });
  $('#result-modal').addEventListener('click', (event) => { if (event.target.id === 'result-modal' || event.target.classList.contains('modal-close')) closeResultModal(); });
  $('#result-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const match = matches.find((item) => item.id === $('#result-form').dataset.matchId);
    const homeScore = Number($('#home-score').value);
    const awayScore = Number($('#away-score').value);
    if (!match || !Number.isInteger(homeScore) || !Number.isInteger(awayScore) || homeScore < 0 || awayScore < 0 || homeScore > 99 || awayScore > 99) { $('#result-error').textContent = 'Saisissez deux scores entiers entre 0 et 99.'; return; }
    try {
      const response = await fetch(`/api/matches/${encodeURIComponent(match.id)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ homeScore, awayScore }) });
      const result = await response.json();
      if (!response.ok) { $('#result-error').textContent = result.error || 'Impossible d’enregistrer le résultat.'; return; }
      Object.assign(match, result.match);
      if (Array.isArray(result.teams)) teams = result.teams;
      else await loadTeamsFromApi();
    } catch (error) {
      applyResultToLocalStandings(match, homeScore, awayScore);
      window.localStorage.setItem('footboard-teams', JSON.stringify(teams));
      window.localStorage.setItem('footboard-matches', JSON.stringify(matches));
    }
    teams = sortTeamsByRanking(teams); renderStandings(); renderMatches(document.querySelector('.filter.active')?.dataset.filter || 'all'); closeResultModal(); showToast('Résultat enregistré et classement mis à jour.'); addNotification('Résultat enregistré', `${match.home} ${homeScore} – ${awayScore} ${match.away}. Le classement a été actualisé.`);
  });
  $('#quick-result-button').addEventListener('click', () => openResultModal(matches.find((match) => !Number.isInteger(match.homeScore)) || matches[0]));
  $('#add-team-button').addEventListener('click', openTeamModal);
  $('#card-team').innerHTML = teams.map((team) => `<option>${team.name}</option>`).join('');
  $('#add-card-button').addEventListener('click', openCardModal);
  $('#card-modal').addEventListener('click', (event) => { if (event.target.id === 'card-modal' || event.target.classList.contains('modal-close')) closeCardModal(); });
  $('#card-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const team = $('#card-team').value;
    const type = $('#card-type').value;
    const count = Number($('#card-count').value);
    if (!team || !type || !Number.isFinite(count) || count <= 0) {
      $('#card-error').textContent = 'Choisissez une équipe, un type et un nombre valide.';
      return;
    }
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team, type, count })
      });
      const result = await response.json();
      if (!response.ok) {
        $('#card-error').textContent = result.error || 'Impossible d’ajouter le carton.';
        return;
      }
      cards.splice(0, cards.length, ...result);
    } catch (error) {
      const existing = cards.find((item) => item.team === team) || { team, yellow: 0, red: 0 };
      existing[type === 'yellow' ? 'yellow' : 'red'] = (existing[type === 'yellow' ? 'yellow' : 'red'] || 0) + count;
      const index = cards.findIndex((item) => item.team === team);
      if (index >= 0) cards[index] = existing; else cards.push(existing);
    }
    renderCards(); closeCardModal(); showToast(`${count} carton(s) ${type === 'yellow' ? 'jaune(s)' : 'rouge(s)'} ajoutés pour ${team}.`);
  });
  $('#team-modal').addEventListener('click', (event) => { if (event.target.id === 'team-modal' || event.target.classList.contains('modal-close')) closeTeamModal(); });
  $('#team-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = $('#team-name').value.trim();
    const short = $('#team-short').value.trim().toUpperCase();
    if (teams.some((team) => team.name.toLowerCase() === name.toLowerCase())) {
      $('#team-error').textContent = 'Cette équipe existe déjà.';
      return;
    }
    const newTeam = { name, short, logo: 'logo-r', played: 0, wins: 0, draws: 0, losses: 0, diff: '0', points: 0 };
    try {
      const response = await fetch('/api/teams', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, short }) });
      const result = await response.json();
      if (!response.ok) {
        $('#team-error').textContent = result.error || 'Impossible d’ajouter l’équipe.';
        return;
      }
      teams.push(result);
    } catch (error) {
      teams.push(newTeam);
    }
    teams = sortTeamsByRanking(teams);
    window.localStorage.setItem('footboard-teams', JSON.stringify(teams));
    renderStandings(); renderTeamOptions(); closeTeamModal(); showToast(`${name} a été ajoutée au championnat.`);
  });
  $('#add-coach-button').addEventListener('click', openCoachModal);
  $('#coach-modal').addEventListener('click', (event) => { if (event.target.id === 'coach-modal' || event.target.classList.contains('modal-close')) closeCoachModal(); });
  $('#coach-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = $('#coach-name').value.trim();
    const team = $('#coach-team').value;
    if (!name || !team) {
      $('#coach-error').textContent = 'Le nom et l’équipe sont obligatoires.';
      return;
    }
    const newCoach = { name, team };
    const isEditMode = $('#coach-form').dataset.mode === 'edit';
    const originalName = $('#coach-form').dataset.originalName || '';
    try {
      const response = await fetch(isEditMode ? `/api/coaches/${encodeURIComponent(originalName)}` : '/api/coaches', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoach)
      });
      const result = await response.json();
      if (!response.ok) {
        $('#coach-error').textContent = result.error || 'Impossible d’ajouter l’entraîneur.';
        return;
      }
      if (isEditMode) {
        const index = coaches.findIndex((coach) => coach.name.toLowerCase() === originalName.toLowerCase());
        if (index >= 0) coaches[index] = result;
      } else {
        coaches.push(result);
      }
    } catch (error) {
      if (isEditMode) {
        const index = coaches.findIndex((coach) => coach.name.toLowerCase() === originalName.toLowerCase());
        if (index >= 0) coaches[index] = newCoach;
      } else {
        coaches.push(newCoach);
      }
    }
    renderStaff(); closeCoachModal(); showToast(isEditMode ? `${name} a été modifié.` : `${name} a été ajouté à ${team}.`);
  });
  $('#add-referee-button').addEventListener('click', () => openRefereeModal('create'));
  $('#referee-modal').addEventListener('click', (event) => { if (event.target.id === 'referee-modal' || event.target.classList.contains('modal-close')) closeRefereeModal(); });
  $('#referee-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = $('#referee-name').value.trim();
    const level = $('#referee-level').value;
    if (!name || !level) {
      $('#referee-error').textContent = 'Le nom et le niveau sont obligatoires.';
      return;
    }
    const newReferee = { name, level };
    const isEditMode = $('#referee-form').dataset.mode === 'edit';
    const originalName = $('#referee-form').dataset.originalName || '';
    try {
      const response = await fetch(isEditMode ? `/api/referees/${encodeURIComponent(originalName)}` : '/api/referees', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReferee)
      });
      const result = await response.json();
      if (!response.ok) {
        $('#referee-error').textContent = result.error || 'Impossible d’ajouter l’arbitre.';
        return;
      }
      if (isEditMode) {
        const index = referees.findIndex((referee) => referee.name.toLowerCase() === originalName.toLowerCase());
        if (index >= 0) referees[index] = result;
      } else {
        referees.push(result);
      }
    } catch (error) {
      if (isEditMode) {
        const index = referees.findIndex((referee) => referee.name.toLowerCase() === originalName.toLowerCase());
        if (index >= 0) referees[index] = newReferee;
      } else {
        referees.push(newReferee);
      }
    }
    renderStaff(); closeRefereeModal(); showToast(isEditMode ? `${name} a été modifié.` : `${name} a été ajouté au panel arbitral.`);
  });
  $('#add-stadium-button').addEventListener('click', () => openStadiumModal('create'));
  $('#stadium-modal').addEventListener('click', (event) => { if (event.target.id === 'stadium-modal' || event.target.classList.contains('modal-close')) closeStadiumModal(); });
  $('#stadium-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = $('#stadium-name').value.trim();
    const city = $('#stadium-city').value.trim();
    const capacity = Number($('#stadium-capacity').value);
    const availability = $('#stadium-availability').value;
    if (!name || !city || !Number.isFinite(capacity) || capacity <= 0) {
      $('#stadium-error').textContent = 'Le nom, la ville et une capacité valide sont requis.';
      return;
    }
    const newStadium = { name, city, capacity, availability };
    const isEditMode = $('#stadium-form').dataset.mode === 'edit';
    const originalName = $('#stadium-form').dataset.originalName || '';
    try {
      const response = await fetch(isEditMode ? `/api/stadiums/${encodeURIComponent(originalName)}` : '/api/stadiums', {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStadium)
      });
      const result = await response.json();
      if (!response.ok) {
        $('#stadium-error').textContent = result.error || 'Impossible d’ajouter le stade.';
        return;
      }
      if (isEditMode) {
        const index = stadiums.findIndex((stadium) => stadium.name.toLowerCase() === originalName.toLowerCase());
        if (index >= 0) stadiums[index] = result;
      } else {
        stadiums.push(result);
      }
    } catch (error) {
      if (isEditMode) {
        const index = stadiums.findIndex((stadium) => stadium.name.toLowerCase() === originalName.toLowerCase());
        if (index >= 0) stadiums[index] = newStadium;
      } else {
        stadiums.push(newStadium);
      }
    }
    renderStaff(); closeStadiumModal(); showToast(isEditMode ? `${name} a été modifié.` : `${name} a été ajouté au programme.`); addNotification(isEditMode ? 'Stade modifié' : 'Nouveau stade', `${name} · ${availabilityLabel(availability)}.`);
  });
  $('#add-facility-button').addEventListener('click', () => openFacilityModal());
  $('#facility-modal').addEventListener('click', (event) => { if (event.target.id === 'facility-modal' || event.target.classList.contains('modal-close')) closeFacilityModal(); });
  $('#facility-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const facility = { name: $('#facility-name').value.trim(), type: $('#facility-type').value, location: $('#facility-location').value.trim(), availability: $('#facility-availability').value };
    if (!facility.name || !facility.type || !facility.location) { $('#facility-error').textContent = 'Le nom, le type et l’emplacement sont obligatoires.'; return; }
    const isEditMode = $('#facility-form').dataset.mode === 'edit';
    const originalName = $('#facility-form').dataset.originalName || '';
    try {
      const response = await fetch(isEditMode ? `/api/facilities/${encodeURIComponent(originalName)}` : '/api/facilities', { method: isEditMode ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(facility) });
      const result = response.status === 204 ? null : await response.json();
      if (!response.ok) { $('#facility-error').textContent = result?.error || 'Impossible d’enregistrer l’installation.'; return; }
      if (isEditMode) { const index = facilities.findIndex((item) => item.name.toLocaleLowerCase('fr') === originalName.toLocaleLowerCase('fr')); if (index >= 0) facilities[index] = result; }
      else facilities.push(result);
    } catch (error) {
      if (isEditMode) { const index = facilities.findIndex((item) => item.name.toLocaleLowerCase('fr') === originalName.toLocaleLowerCase('fr')); if (index >= 0) facilities[index] = facility; }
      else facilities.push(facility);
    }
    renderStaff(); closeFacilityModal(); showToast(isEditMode ? `${facility.name} a été modifiée.` : `${facility.name} a été ajoutée.`); addNotification(isEditMode ? 'Installation modifiée' : 'Nouvelle installation', `${facility.name} · ${availabilityLabel(facility.availability)}.`);
  });
  $('#stadium-search').addEventListener('input', renderStaff);
  $('#stadium-availability-filter').addEventListener('change', renderStaff);
  $('#facility-search').addEventListener('input', renderStaff);
  $('#facility-availability-filter').addEventListener('change', renderStaff);
  $('#venue-details-modal').addEventListener('click', (event) => { if (event.target.id === 'venue-details-modal' || event.target.classList.contains('modal-close')) closeVenueDetails(); });
  $('#close-venue-details').addEventListener('click', closeVenueDetails);
  $('#club-details-modal').addEventListener('click', (event) => { if (event.target.id === 'club-details-modal' || event.target.classList.contains('modal-close')) closeClubDetails(); });
  $('#close-club-details').addEventListener('click', closeClubDetails);
  document.addEventListener('click', async (event) => {
    const viewClubButton = event.target.closest('[data-view-club]');
    if (viewClubButton) { openClubDetails(clubs.find((club) => club.id === viewClubButton.dataset.viewClub)); return; }
    const coachButton = event.target.closest('[data-edit-coach]');
    if (coachButton) {
      const name = decodeURIComponent(coachButton.dataset.editCoach);
      openCoachModal('edit', name);
      return;
    }
    const refereeButton = event.target.closest('[data-edit-referee]');
    if (refereeButton) {
      const name = decodeURIComponent(refereeButton.dataset.editReferee);
      openRefereeModal('edit', name);
      return;
    }
    const stadiumButton = event.target.closest('[data-edit-stadium]');
    if (stadiumButton) {
      const name = decodeURIComponent(stadiumButton.dataset.editStadium);
      openStadiumModal('edit', name);
      return;
    }
    const viewStadiumButton = event.target.closest('[data-view-stadium]');
    if (viewStadiumButton) { const name = decodeURIComponent(viewStadiumButton.dataset.viewStadium); const item = stadiums.find((stadium) => stadium.name === name); if (item) showVenueDetails('Stade', item); return; }
    const deleteStadiumButton = event.target.closest('[data-delete-stadium]');
    if (deleteStadiumButton) {
      const name = decodeURIComponent(deleteStadiumButton.dataset.deleteStadium);
      if (!window.confirm(`Supprimer le stade « ${name} » ?`)) return;
      try { const response = await fetch(`/api/stadiums/${encodeURIComponent(name)}`, { method: 'DELETE' }); if (!response.ok) throw new Error('Suppression impossible'); } catch (error) { /* Supprimer aussi de l’affichage local si l’API est indisponible. */ }
      const index = stadiums.findIndex((stadium) => stadium.name === name); if (index >= 0) stadiums.splice(index, 1); renderStaff(); showToast(`${name} a été supprimé.`); return;
    }
    const editFacilityButton = event.target.closest('[data-edit-facility]');
    if (editFacilityButton) { openFacilityModal('edit', decodeURIComponent(editFacilityButton.dataset.editFacility)); return; }
    const viewFacilityButton = event.target.closest('[data-view-facility]');
    if (viewFacilityButton) { const name = decodeURIComponent(viewFacilityButton.dataset.viewFacility); const item = facilities.find((facility) => facility.name === name); if (item) showVenueDetails('Installation', item); return; }
    const deleteFacilityButton = event.target.closest('[data-delete-facility]');
    if (deleteFacilityButton) {
      const name = decodeURIComponent(deleteFacilityButton.dataset.deleteFacility);
      if (!window.confirm(`Supprimer l’installation « ${name} » ?`)) return;
      try { const response = await fetch(`/api/facilities/${encodeURIComponent(name)}`, { method: 'DELETE' }); if (!response.ok) throw new Error('Suppression impossible'); } catch (error) { /* Supprimer aussi de l’affichage local si l’API est indisponible. */ }
      const index = facilities.findIndex((facility) => facility.name === name); if (index >= 0) facilities.splice(index, 1); renderStaff(); showToast(`${name} a été supprimée.`);
    }
  });
  document.querySelectorAll('.quick-actions button:not(#add-team-button):not(#register-player-button):not(#quick-result-button)').forEach((button) => button.addEventListener('click', () => showToast(`${button.querySelector('strong').textContent} : fonctionnalité prête à être configurée.`)));
  $('#match-list').addEventListener('click', (event) => {
    const resultButton = event.target.closest('[data-record-result]');
    if (resultButton) openResultModal(matches.find((match) => match.id === decodeURIComponent(resultButton.dataset.recordResult)));
  });
  document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => {
    document.querySelector('.nav-link.active').classList.remove('active');
    link.classList.add('active');
    $('.sidebar').classList.remove('open');
    if (link.getAttribute('href') === '#settings') setSettingsExpanded(true);
  }));
  $('.mobile-menu').addEventListener('click', () => $('.sidebar').classList.toggle('open'));
});
