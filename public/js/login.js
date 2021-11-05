// This is the login handler for making a post.
const loginPostHandler = async (event) => {
    event.preventDefault();
  
    // This queries the name and password.
    const name = document.querySelector('#name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // If there is a name and a password for this conditional statement.
    if (name && password) {
      // Fetch the api/users/login route using a POST request.
      const response = await fetch('/api/users/login', {
        method: 'POST',
        // Stringify the password and name.
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If response is valid then update the dashboard.
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  // This is the signup handler for making a new user account.
  const signupPostHandler = async (event) => {
    event.preventDefault();
    // name, email, and password is needed to sign up a new account.
    const name = document.querySelector('#name-signup').value.trim();
    console.log(name)
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // If you have a valid name, email, and password the response fetches the api/users route via a POST request.
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        // Stringify name, email, password.
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // If the response is valid, then update the dashboard.
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  // This binds the longinPostHandler to the submit button.
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginPostHandler);
  // This binds the SignupPostHandler to the submit button.
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupPostHandler);
  