import BandSiteApi from './band-site-api.js';


const API_KEY = 'your_api_key_here'; 
const bandSiteApi = new BandSiteApi(API_KEY);

// Function to render comments
function renderComments(comments) {
  const commentsList = document.getElementById('comments-list');
  if (!commentsList) {
    console.error('Comments list element not found');
    return;
  }
  
  // Clear the existing comments
  commentsList.innerHTML = ""; 
  
  comments.forEach(comment => {
    // Create the comment box container
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment__box');
    
    // Create the avatar element
    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('comment__avatar');
    avatarDiv.textContent = comment.name[0]; // Display the first letter of the name ;)

    // Create the content container
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('comment__content');

    // Create the name and date container
    const nameDateDiv = document.createElement('div');
    nameDateDiv.classList.add('comment__name-date');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('comment__name');
    nameDiv.textContent = comment.name;

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('comment__date');
    const date = new Date(comment.timestamp).toLocaleString();
    dateDiv.textContent = date;

    nameDateDiv.appendChild(nameDiv);
    nameDateDiv.appendChild(dateDiv);

    // Create the comment text element
    const textDiv = document.createElement('div');
    textDiv.classList.add('comment__text');
    textDiv.textContent = comment.comment;

    // Append all elements
    contentDiv.appendChild(nameDateDiv);
    contentDiv.appendChild(textDiv);
    commentDiv.appendChild(avatarDiv);
    commentDiv.appendChild(contentDiv);

    commentsList.appendChild(commentDiv);
  });
}

async function handleFormSubmit(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
  
    if (nameInput && commentInput && nameInput.value && commentInput.value) {
      const newComment = {
        name: nameInput.value,
        comment: commentInput.value
      };
  
      console.log('Submitting new comment:', newComment); // For debugging
  
      try {
        // Post the new comment to the API
        await bandSiteApi.postComment(newComment);
  
        // After posting, fetch the updated list of comments
        const updatedComments = await bandSiteApi.getComments();
        renderComments(updatedComments);
  
        // Clear input fields
        nameInput.value = '';
        commentInput.value = '';
      } catch (error) {
        alert('Failed to post comment. Please try again.');
      }
    } else {
      alert('Please enter both name and comment.');
    }
  }

// Initialize comments
async function initializeComments() {
  try {
    const comments = await bandSiteApi.getComments();
    renderComments(comments);
  } catch (error) {
    console.error('Failed to load comments.');
  }
}

// be suring the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  initializeComments();
  const form = document.getElementById('comment-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  } else {
    console.error('Comment form element not found');
  }
});
