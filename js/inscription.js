const signupForm = document.querySelector('#signup-form');
const signupError = document.querySelector('#signup-error');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('#signup-name').value.trim();
  const email = document.querySelector('#signup-email').value.trim().toLowerCase();
  const password = document.querySelector('#signup-password').value;
  const confirmation = document.querySelector('#signup-confirm').value;

  if (password !== confirmation) {
    signupError.textContent = 'Les deux mots de passe ne correspondent pas.';
    return;
  }

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const payload = await response.json();
    if (!response.ok) {
      signupError.textContent = payload.error || 'Impossible de créer le compte.';
      return;
    }

    window.localStorage.setItem('footboard-auth', JSON.stringify({ token: payload.token }));
    window.localStorage.setItem('footboard-account', JSON.stringify(payload.user));
    window.location.href = '/ouvrage.html';
  } catch (error) {
    signupError.textContent = 'Le serveur d’authentification est indisponible.';
  }
});
