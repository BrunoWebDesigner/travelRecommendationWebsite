document.addEventListener("DOMContentLoaded", () => {
    let travelData = null;

    // Fetch data once on page load
    fetch("travel_recommendation_api.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            travelData = data;
            console.log("Fetched data:", travelData);
            searchRecommendations(travelData, "all"); // Show all recommendations on page load
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            const main = document.querySelector("main");
            main.innerHTML = "<p>Sorry, we couldn’t load the recommendations. Please try again later.</p>";
        });

    // Dropdown change event listener
    const searchDropdown = document.querySelector("#search-dropdown");
    searchDropdown.addEventListener("change", () => {
        if (travelData) {
            const keyword = searchDropdown.value.toLowerCase();
            searchRecommendations(travelData, keyword || "all");
        }
    });

    // Clear button event listener
    const clearButton = document.querySelector("#reset-button");
    clearButton.addEventListener("click", () => {
        document.querySelector("#search-dropdown").selectedIndex = 0; // Reset dropdown to default
        searchRecommendations(travelData, "all"); // Show all recommendations again
    });
});

// Search and display recommendations
function searchRecommendations(data, keyword) {
    const main = document.querySelector("main");
    const resultsContainer = document.createElement("div");
    resultsContainer.id = "recommendation-results";
    
    // Clear previous results
    const existingResults = document.querySelector("#recommendation-results");
    if (existingResults) existingResults.remove();

    let results = [];

    if (keyword === "beach") {
        results = data.beaches.slice(0, 2);
    } else if (keyword === "temple") {
        results = data.temples.slice(0, 2);
    } else if (keyword === "country") {
        results = data.countries.slice(0, 2).flatMap(country => country.cities.slice(0, 1));
    } else {
        // Show all recommendations by default
        results = [
            ...data.beaches,
            ...data.temples,
            ...data.countries.flatMap(country => country.cities)
        ];
    }

    if (results.length > 0) {
        results.forEach(item => {
            const card = document.createElement("div");
            card.className = "city-card";

            let timeDisplay = "";
            const timeZone = getTimeZone(item.name);
            if (timeZone) {
                const options = { timeZone, hour12: true, hour: "numeric", minute: "numeric" };
                const localTime = new Date().toLocaleTimeString("en-US", options);
                timeDisplay = `<p>Current Local Time: ${localTime}</p>`;
            }

            card.innerHTML = `
                <h2>${item.name}</h2>
                <img src="${item.imageUrl}" alt="${item.name}">
                <p>${item.description}</p>
                ${timeDisplay}
            `;
            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = "<p>No recommendations found.</p>";
    }

    main.appendChild(resultsContainer);
}

// Helper function to map locations to time zones
function getTimeZone(location) {
    const timeZones = {
        "Australia": "Australia/Sydney",
        "Japan": "Asia/Tokyo",
        "Brazil": "America/Sao_Paulo",
        "USA": "America/New_York",
        "France": "Europe/Paris",
        "India": "Asia/Kolkata",
        "China": "Asia/Shanghai",
        "UK": "Europe/London",
        "Germany": "Europe/Berlin",
        "Italy": "Europe/Rome",
        "Canada": "America/Toronto",
        "Angkor Wat": "Asia/Phnom_Penh",
        "Bora Bora": "Pacific/Tahiti"
    };

    for (const country in timeZones) {
        if (location.includes(country)) {
            return timeZones[country];
        }
    }
    return null;
}