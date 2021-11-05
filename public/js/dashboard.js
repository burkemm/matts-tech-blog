// This handes the comment post creation.
const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    // If there is a title and there are characters in the content boxes then fetch the api/posts route. Then stringify the title and content.
    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // If the response is valid then update the dashboard.
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // This failure message is if an error occurs.
        alert('Failed to create post');
      }
    }
};
  // This handles the comment post deletion if the user wishes to delete a comment.
  const delButtonHandler = async (event) => {
    // Find the data-id class on the handlebar
    if (event.target.hasAttribute('data-id') && event.target.getAttribute('id') == "delete") {
      const id = event.target.getAttribute('data-id');
      // Respond by fetching the api/posts/id route and delete it.
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      // If the response is valid then update the dashboard.
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // This failure message is if an error occurs.
        alert('Failed to delete post');
      }
    }else if(event.target.hasAttribute('data-id') && event.target.getAttribute('id') == "update"){
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/update/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log(response);
        console.log(typeof response);
      } else {
        alert('Failed to find existing post');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);