const signupForm = document.getElementById("signupForm");
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const userType = document.getElementById("userType").value;

            // Save user in localStorage
            const user = {
                isLoggedIn: true,
                name: username,
                email: email,
                profilePic: userType === "reporter" ? "reporter.png" : "user.png"
            };
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect to index
            window.location.href = "index.html";
        });