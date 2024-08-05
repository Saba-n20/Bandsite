
        // Sample default comments
        const defaultComments = [
            { name: 'Gurleen', text: 'This is a great post!', date: new Date().toLocaleString(),},
            { name: 'Pearl', text: 'I found this information very useful.', date: new Date().toLocaleString(),},
            { name: 'Suzan', text: 'Thanks for sharing this!', date: new Date().toLocaleString()}
        ];

        // Function to render comments
        function renderComments(comments) {
            const commentsList = document.getElementById('comments-list');
            commentsList.innerHTML = ""; // Clear the existing comments
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                    <div class="comment__avatar">
                        <span>${comment.name[0]}</span> <!-- Display the first letter of the name  :) -->
                    </div>
                    <div class="comment__content">
                    <div class="comment__name-date">
                        <div class="comment__name">${comment.name}</div>
                        <div class="comment__date">${comment.date}</div>
                    </div>
                        <div class="comment__text">${comment.text}</div>
                    </div>
                `;
                commentsList.appendChild(commentDiv);
            });
        }

        // Function to handle form submission
        function handleFormSubmit(event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const commentInput = document.getElementById('comment');

            if (nameInput.value && commentInput.value) {
                const currentDate = new Date().toLocaleString(); // Get current date and time
                const newComment = {
                    name: nameInput.value,
                    date: currentDate,
                    text: commentInput.value,
                     
                };
                comments.unshift(newComment); // Add new comment to the start of the array
                renderComments(comments); // Re-render comments

                // Clear input fields
                nameInput.value = '';
                commentInput.value = '';
            } else {
                alert('Please enter both name and comment.');
            }
        }

        // Initial comments setup
        let comments = [...defaultComments];
        renderComments(comments);

        // Event listener for the form submission
        document.getElementById('comment-form').addEventListener('submit', handleFormSubmit);