const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// This route creates the new comment post the user is generating.
router.post('/', withAuth, async (req, res) => {
  try {
    // This tags the session to the user ID and a comment is required.
    const newCommentPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCommentPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// This route deletes the post the user has generated
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // This looks for the post and deletes it by id and user_id.
    const commentData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // If there is not comment then a 404 error is generated
    if (!commentData) {
      res.status(404).json();
      return;
    }
    // If there is a comment then the deletion proceeds.
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;