const router = require('express').Router();
const { Post, User, } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Gather all the posts and merge it with the user.
    const commentData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })
    // This maps the comments 
    const posts = commentData.map((post) => post.get({ plain: true}));

    // Take the posts and session and render it in on the homepage.
    res.render('homepage', {
    posts,
    logged_in: req.session.logged_in});
    
  } catch (err) {
    res.status(500).json(err);
  }
});
// This gets the post and id
router.get('/post/:id', async (req, res) => {
  try {
    // find the comment by id and include the user and the name.
    const commentData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = commentData.get({ plain: true });
    // Render the post if the user has a logged in session.
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This router is for the dashboard button. The withAuth middlware prevents access to this route.
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    // set the user to the userInfo.
    const user = userInfo.get({ plain: true });
    // Render the user on the dashboard and the sesion.
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // Redirect the user to a different route if they're already logged into a session.
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;