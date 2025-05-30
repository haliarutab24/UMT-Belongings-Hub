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