const crypto = require('node:crypto');
const path = require('node:path');
const readline = require('node:readline');
const { createInterface } = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const { DatabaseSync } = require('node:sqlite');

const database = new DatabaseSync(path.join(__dirname, '..', 'data', 'footboard.sqlite'));

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${derived}`;
}

function promptHidden(label) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== 'function') {
    return Promise.reject(new Error('Cette commande doit être lancée dans un terminal interactif.'));
  }

  readline.emitKeypressEvents(stdin);
  stdin.setRawMode(true);
  stdin.resume();
  stdout.write(label);

  return new Promise((resolve, reject) => {
    let value = '';
    const onKeypress = (character, key = {}) => {
      if (key.ctrl && key.name === 'c') {
        cleanup();
        reject(new Error('Opération annulée.'));
      } else if (key.name === 'return' || key.name === 'enter') {
        cleanup();
        resolve(value);
      } else if (key.name === 'backspace') {
        if (value.length) {
          value = value.slice(0, -1);
          stdout.write('\b \b');
        }
      } else if (character && !key.ctrl && !key.meta && character !== '\r' && character !== '\n') {
        value += character;
        stdout.write('*');
      }
    };
    const cleanup = () => {
      stdin.removeListener('keypress', onKeypress);
      stdin.setRawMode(false);
      stdout.write('\n');
    };
    stdin.on('keypress', onKeypress);
  });
}

async function main() {
  const terminal = createInterface({ input: stdin, output: stdout });
  let email;
  try {
    email = (await terminal.question('Adresse e-mail du compte : ')).trim().toLowerCase();
  } finally {
    terminal.close();
  }

  const firstPassword = await promptHidden('Nouveau mot de passe (6 caractères minimum) : ');
  if (firstPassword.length < 6) {
    throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
  }
  const confirmation = await promptHidden('Confirmez le nouveau mot de passe : ');
  if (firstPassword !== confirmation) {
    throw new Error('Les mots de passe ne correspondent pas.');
  }

  const passwordHash = hashPassword(firstPassword);
  const result = database.prepare('UPDATE users SET password_hash = ? WHERE email = ?').run(passwordHash, email);
  if (result.changes === 0) {
    throw new Error('Aucun compte ne correspond à cette adresse e-mail.');
  }
  console.log('Mot de passe réinitialisé. Vous pouvez maintenant vous connecter avec ce compte.');
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => database.close());
