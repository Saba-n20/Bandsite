import BandSiteApi from './band-site-api.js';

// Create an instance of BandSiteApi with your API key
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const api = new BandSiteApi(apiKey);

// Function to format date to "Mon Sep 09 2024"
function formatDate(date) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  }

// Function to create and return a show item element
function createShowItem(show) {
    const showItem = document.createElement('div');
    showItem.classList.add('shows__item');
  
    // Format the date from timestamp
    const formattedDate = formatDate(new Date(show.date)); // Convert timestamp to Date
  
    // Create and append date
    const dateParagraph = document.createElement('p');
    dateParagraph.classList.add("shows__info");
  
    const labelElementDate = document.createElement('label');
    labelElementDate.classList.add("shows__label");
    labelElementDate.textContent = 'Date:';
  
    const spanElementDate = document.createElement('h3');
    spanElementDate.classList.add("shows__details");
    spanElementDate.textContent = formattedDate;
  
    dateParagraph.appendChild(labelElementDate);
    dateParagraph.appendChild(spanElementDate);
    showItem.appendChild(dateParagraph);
  
    // Create and append venue (place)
    const venueParagraph = document.createElement('p');
    venueParagraph.classList.add("shows__info");
  
    const labelElementVenue = document.createElement('label');
    labelElementVenue.classList.add("shows__label");
    labelElementVenue.textContent = 'Venue:';
  
    const spanElementVenue = document.createElement('h3');
    spanElementVenue.classList.add("shows__details");
    spanElementVenue.textContent = show.place || 'Venue not available'; // Added fallback
  
    venueParagraph.appendChild(labelElementVenue);
    venueParagraph.appendChild(spanElementVenue);
    showItem.appendChild(venueParagraph);
  
    // Create and append location
    const locationParagraph = document.createElement('p');
    locationParagraph.classList.add("shows__info");
  
    const labelElementLocation = document.createElement('label');
    labelElementLocation.classList.add("shows__label");
    labelElementLocation.textContent = 'Location:';
  
    const spanElementLocation = document.createElement('h3');
    spanElementLocation.classList.add("shows__details");
    spanElementLocation.textContent = show.location || 'Location not available'; // Added fallback
  
    locationParagraph.appendChild(labelElementLocation);
    locationParagraph.appendChild(spanElementLocation);
    showItem.appendChild(locationParagraph);
  
    // Create and append button
    const button = document.createElement('button');
    button.textContent = 'Buy Ticket';
    button.classList.add('shows__button');
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      alert(`Buying ticket for ${show.place || 'this event'}`);
    });
    showItem.appendChild(button);
  
    return showItem;
  }
  

  async function renderShows() {
    const container = document.querySelector('.shows__container');
    
    if (!container) {
      console.error('Element with class .shows__container not found.');
      return;
    }
  
    try {
      const shows = await api.getShows();
      
      if (!shows || shows.length === 0) {
        console.error('No shows available.');
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
    } catch (error) {
      console.error('Error rendering shows:', error);
      // Optionally show an error message to the user
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderShows();
  });
  
