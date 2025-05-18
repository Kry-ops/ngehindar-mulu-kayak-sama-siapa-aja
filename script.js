(function () {
  const form = document.getElementById('loginForm');
  const usernameField = form.username;
  const passwordField = form.password;
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  const togglePasswordBtn = form.querySelector('.toggle-password');
  const container = document.querySelector('.login-container');

  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordField.type === 'password';
    passwordField.type = isPassword ? 'text' : 'password';
    togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
  });

  togglePasswordBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePasswordBtn.click();
    }
  });

  function validate() {
    let valid = true;
    if (!usernameField.value.trim()) {
      usernameError.textContent = 'Please enter your username or email.';
      valid = false;
    } else {
      usernameError.textContent = '';
    }

    if (!passwordField.value) {
      passwordError.textContent = 'Password is required.';
      valid = false;
    } else if (passwordField.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters.';
      valid = false;
    } else {
      passwordError.textContent = '';
    }
    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Login successful!\nUsername/Email: ' + usernameField.value);
      form.reset();
      togglePasswordBtn.textContent = 'Show';
      passwordField.type = 'password';
    }
  });

  usernameField.addEventListener('input', () => {
    if (usernameField.value.trim()) usernameError.textContent = '';
  });

  passwordField.addEventListener('input', () => {
    if (passwordField.value.length >= 6) passwordError.textContent = '';
  });

  // Evasive movement animation
  let mouseX = 0, mouseY = 0;
  const THRESHOLD = 60;
  const SPEED = 1.25;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < THRESHOLD) {
      const moveX = -dx / distance * 320;
      const moveY = -dy / distance * 320;
      let newLeft = rect.left + moveX;
      let newTop = rect.top + moveY;

      newLeft = Math.max(0, Math.min(window.innerWidth - rect.width, newLeft));
      newTop = Math.max(0, Math.min(window.innerHeight - rect.height, newTop));

      container.style.left = `${newLeft}px`;
      container.style.top = `${newTop}px`;
      container.style.transform = 'none';
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
