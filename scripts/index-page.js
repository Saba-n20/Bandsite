import BandSiteApi from './band-site-api.js';

// Only declare bandSiteApi once
const API_KEY = 'your_api_key_here'; // Replace with your actual API key
const bandSiteApi = new BandSiteApi(API_KEY);

// Function to render comments
function renderComments(comments) {
  const commentsList = document.getElementById('comments-list');
  if (!commentsList) {
    console.error('Comments list element not found');
    return;
  }
  commentsList.innerHTML = ""; // Clear the existing comments
  comments.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment__box');
    // Convert timestamp to a readable date format
    const date = new Date(comment.timestamp).toLocaleString();
    commentDiv.innerHTML = `
      <div class="comment__avatar">
        ${comment.name[0]} <!-- Display the first letter of the name  :) -->
      </div>
      <div class="comment__content">
        <div class="comment__name-date">
          <div class="comment__name">${comment.name}</div>
          <div class="comment__date">${date}</div>
        </div>
        <div class="comment__text">${comment.comment}</div>
      </div>
    `;
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
        // Removed timestamp as it's not needed by the API
      };
  
      console.log('Submitting new comment:', newComment); // Debugging line
  
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
  

// Initialize comments and setup form submission listener
async function initializeComments() {
  try {
    const comments = await bandSiteApi.getComments();
    renderComments(comments);
  } catch (error) {
    console.error('Failed to load comments.');
  }
}

// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  initializeComments();
  const form = document.getElementById('comment-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  } else {
    console.error('Comment form element not found');
  }
});
