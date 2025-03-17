# Travel Recommendations

## Overview
Travel Recommendations is a web application that provides curated travel suggestions for beaches, temples, and cities. Users can filter recommendations through a dropdown menu, and local times for destinations are displayed dynamically.

## Features
- Fetches and displays travel recommendations from `travel_recommendation_api.json`
- Filters recommendations by category (beaches, temples, or cities)
- Displays local time for destinations
- Automatically updates results upon filter selection
- Reset button to show all recommendations

## Technologies Used
- HTML, CSS, JavaScript
- JSON for data storage
- Fetch API for retrieving recommendations

## Project Structure
```
📂 Travel Recommendations
│── index.html               # Main HTML file
│── styles.css               # Stylesheet
│── travel_recommendation.js # JavaScript logic
│── travel_recommendation_api.json # Data source
│── about.html
│── contact.html
│── images

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/travel-recommendations.git
   ```
2. Open `index.html` in a browser.

## Usage
- Select a recommendation type from the dropdown to filter destinations.
- Click "Reset" to display all recommendations again.
- Time zones are automatically assigned to locations.

## Future Improvements
- Add more categories and recommendations.
- Improve UI/UX with better styling.
- Implement a backend for dynamic data updates.

## License
This project is licensed under the MIT License.

