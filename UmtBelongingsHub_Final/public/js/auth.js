<<<<<<< HEAD
// Auth Module
const Auth = (() => {
  const baseUrl = 'http://localhost:5000/api/auth';

  // DOM Elements
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const authButtons = document.getElementById('auth-buttons');
  const userProfile = document.getElementById('user-profile');
  const usernameSpan = document.getElementById('username');

  let currentUser = null; // Store current user details including role

  // Check login status and role
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${baseUrl}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        currentUser = await response.json();
        updateUI(currentUser);
      } else {
        logout(); // Force logout if token is invalid
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      logout(); // Force logout on error
    }
  };

  // Update UI based on auth state and role
  const updateUI = (user) => {
    if (user) {
      authButtons.style.display = 'none';
      userProfile.style.display = 'block';
      usernameSpan.textContent = user.name;

      // Redirect non-admin users away from admin panel
      if (window.location.pathname.includes('/admin') && user.role !== 'ADMIN') {
        window.location.href = '/'; // Redirect to home or another appropriate page
      }
    } else {
      authButtons.style.display = 'block';
      userProfile.style.display = 'none';

      // Redirect to login if trying to access admin panel without auth
      if (window.location.pathname.includes('/admin')) {
        window.location.href = '/login'; // Redirect to login page
      }
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        currentUser = data.user;
        updateUI(currentUser);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    currentUser = null;
    updateUI(null);
  };

  // Check if the current user is an admin
  const isAdmin = () => {
    return currentUser && currentUser.role === 'ADMIN';
  };

  // Event Listeners
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const email = prompt('Enter your email:');
      const password = prompt('Enter your password:');
      if (email && password) login(email, password);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  // Initialize
  checkAuth();

  return {
    login,
    logout,
    getToken: () => localStorage.getItem('token'),
    isAdmin // Expose isAdmin function for external use
  };
})();
=======
async function handleAdminLogin(email, password) {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('adminToken', data.token);
      window.location.href = 'admin.html';
    } else {
      alert(data.error || "Access denied. Not an admin.");
      // Switch to student login
      $('#adminLoginModal').modal('hide');
      $('#loginModal').modal('show');
    }
  } catch (error) {
    alert("Login failed. Try again.");
  }
}
// Example: Login form submission (AJAX call)
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value; // Changed from username
  const password = document.getElementById("password").value;

  const response = await fetch("/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }) // Now sending email instead of username
  });

  const data = await response.json();
  if (data.success) {
    localStorage.setItem("adminToken", data.token);
    window.location.href = "/admin/dashboard.html";
  } else {
    alert("Login failed: " + data.error);
  }
});
>>>>>>> 46c980f62052eb81cf9f88cc20ad812007b6a533
