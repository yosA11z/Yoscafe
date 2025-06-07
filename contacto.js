const form = document.getElementById('contactForm');
const messageEl = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        showMessage('Por favor completa todos los campos.', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Por favor ingresa un correo válido.', 'error');
        return;
    }

    showMessage(`¡Gracias por contactarnos, ${name}! Te responderemos pronto.`, 'success');

    form.reset();
});

function showMessage(msg, type) {
    messageEl.textContent = msg;
    messageEl.className = `form-message ${type}`;

    // Animación suave al mostrar el mensaje
    messageEl.style.opacity = '0';
    setTimeout(() => {
        messageEl.style.opacity = '1';
    }, 50);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}
