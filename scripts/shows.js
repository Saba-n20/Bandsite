// script.js

// Example array of shows
const shows = [
    { date: "09-09-2024", venue: "Ronald Lane", location: "San Francisco, CA" },
    { date: "09-17-2024", venue: "Pier 3 East", location: "San Francisco, CA" },
    { date: "10-12-2024", venue: "View Lounge", location: "San Francisco, CA" },
    { date: "11-16-2024", venue: "Hyatt Agency", location: "San Francisco, CA" },
    { date: "11-29-2024", venue: "Moscow Center", location: "San Francisco, CA" },
    { date: "12-18-2024", venue: "Press Club", location: "San Francisco, CA" },
];

// Function to format date to "Mon Sep 09 2024"
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

// Function to create and return a show item element
function createShowItem(show) {
    // Create the show item container
    const showItem = document.createElement('div');
    showItem.classList.add('shows__item');
    
    
// Create and append date
const dateParagraph = document.createElement('p');
dateParagraph.classList.add("shows__info")

// Create the <label> element
const labelElementDate = document.createElement('label');
labelElementDate.classList.add("shows__label")
labelElementDate.textContent = 'Date:';

// Create the <h3> element
const spanElementDate = document.createElement('h3');
spanElementDate.classList.add("shows__details")
spanElementDate.textContent = formatDate(show.date);

// Append the <label> and <h3> elements to the <p> element
dateParagraph.appendChild(labelElementDate);
dateParagraph.appendChild(spanElementDate);

// Append the <p> element to the showItem
showItem.appendChild(dateParagraph);
    
    
// Create and append venue
const venueParagraph = document.createElement('p');
venueParagraph.classList.add("shows__info")

// Create the <label> element
const labelElementVenue = document.createElement('label');
labelElementVenue.classList.add("shows__label")
labelElementVenue.textContent = 'Venue:';

// Create the <h3> element
const spanElementVenue = document.createElement('h3');
spanElementVenue.classList.add("shows__details")
spanElementVenue.textContent = show.venue;

// Append the <label> and <h3> elements to the <p> element
venueParagraph.appendChild(labelElementVenue);
venueParagraph.appendChild(spanElementVenue);

// Append the <p> element to the showItem
showItem.appendChild(venueParagraph);

    
// Create the <p> element
const locationParagraph = document.createElement('p');
locationParagraph.classList.add("shows__info")

// Create the <location> element
const labelElementLocation = document.createElement('label');
labelElementLocation.classList.add("shows__label")
labelElementLocation.textContent = 'Location:';

// Create the <h3> element
const spanElementLocation = document.createElement('h3');
spanElementLocation.classList.add("shows__details")
spanElementLocation.textContent = show.location;

// Append the <label> and <h3> elements to the <p> element
locationParagraph.appendChild(labelElementLocation);
locationParagraph.appendChild(spanElementLocation);

// Append the <p> element to the showItem
showItem.appendChild(locationParagraph);



    
    // Create and append button
    const button = document.createElement('button');
    button.textContent = 'Buy Ticket';
    button.classList.add('shows__button');
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        alert(`Buying ticket for ${show.title}`);
    });
    showItem.appendChild(button);
    
    // Return the complete show item element
    return showItem;
}

// Function to render the list of shows
function renderShows() {
    const container = document.querySelector('.shows__container');
    
    if (!container) {
        console.error('Element with class .shows-container not found.');
        return;
    }
    
    shows.forEach(show => {
        const showItem = createShowItem(show);
        
        // Add click event to toggle selection
        showItem.addEventListener('click', () => {
            document.querySelectorAll('.shows__item').forEach(item => {
                item.classList.remove('selected');
            });
            showItem.classList.add('selected');
        });
        
        container.appendChild(showItem);
    });
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    renderShows();
});
