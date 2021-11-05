const router = require('express').Router();
const { User } = require('../../models');

// This router posts takes in the user's information.
router.post('/', async (req, res) => {
  // This takes the user's info of name, email, and password, and creates the user account.
  try {
    const userInfo = await User.create(req.body);
    
    // This saves the session the user just made by creating an account.
    req.session.save(() => {
      // It saves the userInfo and the session.logged_in is set to true.
      req.session.user_id = userInfo.id;
      req.session.logged_in = true;
      res.status(200).json(userInfo);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// This route is for the login button. You click this to either log in or create a user account.
router.post('/login', async (req, res) => {
  try {
    const userInfo = await User.findOne({ where: { name: req.body.name } });
    // If the userInfo is incorrect hte user sees an error message.
    if (!userInfo) {
      res
        .status(400)
        .json({ message: 'Incorrect name or password, please try again' });
      return;
    }
    // This enforces a password validation by verifying the generated password.
    const validPassword = await userInfo.checkPassword(req.body.password);
    // If the password is invalid the user sees an error.
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // This saves the session with the userInfo and the session.logged_in set to true.
    req.session.save(() => {
      req.session.user_id = userInfo.id;
      req.session.logged_in = true;
      
      res.json({ user: userInfo, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
// This route is set for the logout button.
router.post('/logout', (req, res) => {
  // This conditional statement is used if a user is logged into a session and they click the logout button.
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // The session is destroyed at this point.
      res.status(204).end();
    });
  } else {
    // If there is no session then the login button is not visible.
    res.status(404).end();
  }
});

module.exports = router;