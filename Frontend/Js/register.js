const form = document.getElementById('form');
const msg = document.getElementById('msg');

function showMessage(text, type) {
    msg.textContent = text;
    msg.className = `msg ${type}`;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim().toLowerCase(),
    username: form.username.value.trim(),
    bio: form.bio.value.trim() || null
    };

    try {
    const res = await fetch(
        CONFIG.BASE_URL + CONFIG.API.REGISTER,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
    );

    const data = await res.json();

    if (!res.ok) {
        showMessage(data.message || 'Register failed', 'error');
        return;
    }

    showMessage('Registered successfully! Redirecting to login...', 'success');

    // ✅ REDIRECT بعد التسجيل
    setTimeout(() => {
        if (!CONFIG.PAGES || !CONFIG.PAGES.LOGIN) {
            console.error('CONFIG.PAGES.LOGIN is not defined');
            return;
        }
        window.location.href = CONFIG.PAGES.LOGIN;
    }, 1500);

    } catch (err) {
    showMessage('Network error', 'error');
    }
});
