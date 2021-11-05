// This is the logout constant.
const logout = async () => {
  // Use a POST request to fetch the api/users/logout route.
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    // If the response is valid, then update the dashboard.
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // If the response was invalid then respond with a status.
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  