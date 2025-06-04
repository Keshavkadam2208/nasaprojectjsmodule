const apiKey = "Z7Ed75tojpg4tVIovUJ6hj8fTqkK15OYlv3mDWAU"; 
const baseUrl = "https://api.nasa.gov/planetary/apod";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imageContainer = document.getElementById("current-image-container");
const searchHistoryList = document.getElementById("search-history");

// Run on page load
window.onload = () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
};

// Get today's image
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetchImage(currentDate);
}

// Get image for a specific date
function getImageOfTheDay(date) {
    fetchImage(date);
    saveSearch(date);
    addSearchToHistory();
}

// Save to localStorage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem("searches", JSON.stringify(searches));
    }
}

// Display search history
function addSearchToHistory() {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searchHistoryList.innerHTML = "";

    searches.forEach(date => {
        const li = document.createElement("li");
        li.textContent = date;
        li.addEventListener("click", () => fetchImage(date));
        searchHistoryList.appendChild(li);
    });
}

// Fetch image data from API
function fetchImage(date) {
    fetch(`${baseUrl}?api_key=${apiKey}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            imageContainer.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.date}</p>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            imageContainer.innerHTML = `<p>Error fetching image: ${error.message}</p>`;
        });
}

// Handle form submission
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const selectedDate = searchInput.value;
    if (selectedDate) {
        getImageOfTheDay(selectedDate);
    }
});
