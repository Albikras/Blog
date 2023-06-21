const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [{ model: User }] });

    const posting = postData.map((msg) => msg.get({ plain: true }));

    console.log("posting:", posting);

    res.render("homepage", {
      posting,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ message: "cringe", error: err });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const dashData = await Post.findAll();

    const dash = dashData.map((msg) => msg.get({ plain: true }));

    console.log("dash:", dash);
    res.render("dashboard", {
      dash,
    });
  } catch (err) {
    res.status(500).json({ message: "error not logged in", error: err });
  }
});
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });
    const commentData = await Comment.findAll({
      where: { post_id: req.params.id },
    });
    const post = postData.get({ plain: true });
    console.log("post:", post);

    const comment = commentData.map((msg) => msg.get({ plain: true }));
    console.log("comment:", comment);

    res.render("comment", {
      post,
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "whatever", error: err });
  }
});

router.get("/login", async (req, res) => {
  try {
    await res.render("login");
  } catch (err) {
    res.status(500).json({ message: "error not logged in", error: err });
  }
});

router.get("/logout", async (req, res) => {
  try {
    await res.redirect("login");
    return;
  } catch (err) {
    res.status(500).json({ message: "error not logged in", error: err });
  }
});

module.exports = router;
