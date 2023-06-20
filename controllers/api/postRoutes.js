const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const message = req.body.message;
    const userPost = await Post.create({
      message: message,
      user_id: req.session.user_id,
    });
    res.status(200).json(userPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
