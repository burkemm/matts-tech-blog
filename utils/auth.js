const withAuth = (req, res, next) => {
    // If there is no active session, then redirect the user to the login page.
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;