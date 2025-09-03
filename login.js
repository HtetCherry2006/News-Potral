const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const userData = Object.fromEntries(formData);

    // Simulate login
    if (userData.username === "user" && userData.password === "password") {
        alert(`Welcome ${userData.username}!`);
        // Redirect based on role
        if (userData.role === "reporter") {
            window.location.href = "reporter.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        alert("Invalid credentials. Please try again.");
    }
});