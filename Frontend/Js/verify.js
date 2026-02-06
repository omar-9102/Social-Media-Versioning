const form = document.getElementById('form');
const msg = document.getElementById('msg');

function showMessage(text, type) {
  msg.textContent = text;
  msg.className = `msg ${type}`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = form.token.value.trim();
  if (!token) {
    showMessage('Token is required', 'error');
    return;
  }

  try {
    const res = await fetch(`${CONFIG.BASE_URL}/api/auth/verify?token=${encodeURIComponent(token)}`);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      showMessage(data.error || data.message || 'Verification failed', 'error');
      return;
    }

    const sessionId = data.sessionId || '(no id)';
    showMessage(`Verified! sessionId: ${sessionId}`, 'success');
  } catch (err) {
    showMessage(`Network error: ${err.message}`, 'error');
  }
});
