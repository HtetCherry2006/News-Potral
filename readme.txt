Project: NewsPortal

This project is a front-end news web page built using HTML, CSS, and JavaScript.

Features:
- Dynamic news fetching from an external API based on categories (General, Business, Sports, Technology).
- Search functionality to find specific news articles.
- Responsive design for various screen sizes.
- Simulated login/signup system to gate access to full articles.
- A newsletter subscription form.
- A static footer with contact information and categories.

How to Run:
1. Ensure you have the project files in a local directory.
2. An API key is required from a news API provider (e.g., newsapi.org). You'll need to replace the placeholder API key in the `index.js` file with your own key.
3. Open `index.html` in a web browser, or use a live server extension in your code editor (like Live Server for VS Code) to serve the files.

Project Structure:
- `index.html`: The main news page.
- `login.html`: The user login page.
- `signup.html`: The user signup page.
- `style.css`: General styles for the main page footer.
- `login.css`: Styles specific to the login page.
- `signup.css`: Styles specific to the signup page.
- `index.js`: The core JavaScript file for fetching and displaying news, handling button clicks, and managing user interaction.
- `login.js`: JavaScript for handling the simulated login logic.
- `signup.js`: JavaScript for handling the simulated signup and storing user information locally.
- `.vscode/launch.json`: VS Code configuration for launching the project with Chrome.