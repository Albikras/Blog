const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const message = req.body.message;

    const userComment = await Comment.create({
      message: message,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(userComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
