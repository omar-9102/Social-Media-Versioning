const form = document.getElementById('form');
const msg = document.getElementById('msg');

function showMessage(text, type) {
  msg.textContent = text;
  msg.className = `msg ${type}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value.trim().toLowerCase();
  if (!email) {
    showMessage('Email is required', 'error');
    return;
  }

  try {
    const res = await fetch(`${CONFIG.BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      showMessage(data.error || data.message || 'Login failed', 'error');
      return;
    }

    showMessage('Magic link sent. Check server console.', 'success');
  } catch (err) {
    showMessage(`Network error: ${err.message}`, 'error');
  }
});
