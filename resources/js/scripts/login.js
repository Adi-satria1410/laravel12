// Toggle Password Visibility
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.querySelector('.password-toggle');

  if (passwordInput?.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon?.classList.remove('fa-eye');
    toggleIcon?.classList.add('fa-eye-slash');
  } else {
    if (passwordInput) passwordInput.type = 'password';
    toggleIcon?.classList.remove('fa-eye-slash');
    toggleIcon?.classList.add('fa-eye');
  }
}

// Form Submission with Loading State
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  const submitBtn = document.querySelector('.login-btn');
  const loading = document.querySelector('.loading');
  const btnText = document.querySelector('.btn-text');

  if (loading && btnText && submitBtn) {
    loading.style.display = 'inline-block';
    btnText.textContent = 'Signing In...';
    submitBtn.disabled = true;

    // Simulate loading (remove in production)
    setTimeout(() => {
      loading.style.display = 'none';
      btnText.textContent = 'Sign In';
      submitBtn.disabled = false;
    }, 2000);
  }
});

// Input Animation Effects
document.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('focus', function () {
    this.parentElement?.classList.add('focused');
  });

  input.addEventListener('blur', function () {
    if (this.value === '') {
      this.parentElement?.classList.remove('focused');
    }
  });
});

// Social Login Handlers
document.querySelector('.social-btn.google')?.addEventListener('click', function () {
  console.log('Google login clicked');
  // Implement Google OAuth here
});

document.querySelector('.social-btn.facebook')?.addEventListener('click', function () {
  console.log('Facebook login clicked');
  // Implement Facebook OAuth here
});
