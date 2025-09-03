const API_KEY = "9e9b7d1c2042476586e5d3584b6e7cab";

// Navbar buttons
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("searchBtn");

// Input and display elements
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Footer buttons
const generalFooter = document.getElementById("generalFooter");
const businessFooter = document.getElementById("businessFooter");
const sportsFooter = document.getElementById("sportsFooter");
const technologyFooter = document.getElementById("technologyFooter");
const entertainmentFooter = document.getElementById("entertainmentFooter");

// Newsletter input
const newsletterEmail = document.getElementById("newsletterEmail");
const submitBtn = document.getElementById("submit-btn");

let newsDataArr = [];
let isLoggedIn = false; // fake login system

// Helper function to fetch news
async function fetchNews(url, title) {
    newsType.innerHTML = `<h4>${title}</h4>`;
    newsdetails.innerHTML = "<p>Loading news...</p>";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 401) {
                newsdetails.innerHTML = "<h5>Error: Invalid API Key. Please check your key.</h5>";
            } else if (response.status === 429) {
                newsdetails.innerHTML = "<h5>Error: Too many requests. Please try again later.</h5>";
            } else {
                newsdetails.innerHTML = `<h5>Error: ${response.status} ${response.statusText}</h5>`;
            }
            return;
        }

        const data = await response.json();
        newsDataArr = data.articles;
        displayNews();
    } catch (error) {
        console.error("Fetch error:", error);
        newsdetails.innerHTML = "<h5>An error occurred while fetching data.</h5>";
    }
}

// Display news cards
function displayNews() {
    newsdetails.innerHTML = "";
    if (!newsDataArr || newsDataArr.length === 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    const row = document.createElement("div");
    row.className = "row";

    newsDataArr.forEach(news => {
        const date = news.publishedAt ? news.publishedAt.split("T")[0] : "N/A";
        const imageUrl = news.urlToImage || "https://via.placeholder.com/150";

        const col = document.createElement("div");
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2";

        const card = document.createElement("div");
        card.className = "card h-100";

        const image = document.createElement("img");
        image.className = "card-img-top";
        image.src = imageUrl;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const newsHeading = document.createElement("h5");
        newsHeading.className = "card-title";
        newsHeading.textContent = news.title;

        const dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.textContent = date;

        const description = document.createElement("p");
        description.className = "text-muted";
        description.textContent = news.description || "";

        const link = document.createElement("button");
        link.className = "btn btn-dark";
        link.textContent = "Read more";

        // Handle click
        link.addEventListener("click", () => {
            if (isLoggedIn) {
                window.open(news.url, "_blank");
            } else {
                const authModal = new bootstrap.Modal(document.getElementById("authModal"));
                authModal.show();
            }
        });

        cardBody.append(newsHeading, dateHeading, description, link);
        card.append(image, cardBody);
        col.appendChild(card);
        row.appendChild(col);
    });

    newsdetails.appendChild(row);
}

// Fetch news by category
function fetchCategory(category, title) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
    fetchNews(url, title);
}

// Fetch search news
function fetchQueryNews() {
    const query = newsQuery.value.trim();
    if (!query) {
        newsdetails.innerHTML = "<h5>Please enter a search query.</h5>";
        return;
    }
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&apiKey=${API_KEY}`;
    fetchNews(url, `Search Results for "${query}"`);
}

// Event listeners - Navbar
generalBtn.addEventListener("click", () => fetchCategory("general", "General News"));
businessBtn.addEventListener("click", () => fetchCategory("business", "Business News"));
sportsBtn.addEventListener("click", () => fetchCategory("sports", "Sports News"));
technologyBtn.addEventListener("click", () => fetchCategory("technology", "Technology News"));
if (entertainmentBtn) {
    entertainmentBtn.addEventListener("click", () => fetchCategory("entertainment", "Entertainment News"));
}
searchBtn.addEventListener("click", fetchQueryNews);

// Event listeners - Footer (with preventDefault)
generalFooter.addEventListener("click", (e) => { e.preventDefault(); fetchCategory("general", "General News"); });
businessFooter.addEventListener("click", (e) => { e.preventDefault(); fetchCategory("business", "Business News"); });
sportsFooter.addEventListener("click", (e) => { e.preventDefault(); fetchCategory("sports", "Sports News"); });
technologyFooter.addEventListener("click", (e) => { e.preventDefault(); fetchCategory("technology", "Technology News"); });
entertainmentFooter.addEventListener("click", (e) => { e.preventDefault(); fetchCategory("entertainment", "Entertainment News"); });

// Newsletter subscription
submitBtn.addEventListener("click", () => {
    if (!newsletterEmail.value.trim()) {
        alert("Please enter your email to subscribe.");
    } else {
        alert(`Subscribed successfully with ${newsletterEmail.value}!`);
        newsletterEmail.value = "";
    }
});

// Load headlines on page load
window.onload = () => {
    fetchCategory("general", "Headlines");
};
