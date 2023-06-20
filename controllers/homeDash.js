const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, include: [{ model: Comment }] }],
    });
    const posting = postData.map((msg) => msg.get({ plain: true }));
    console.log("posting:", posting);
    await res.render("homepage", {
      posting,
    });
  } catch (err) {
    res.status(500).json({ message: "error not logged in", error: err });
  }
});

router.get("/login", async (req, res) => {
  try {
    await res.render("/login");
  } catch (err) {
    res.status(500).json({ message: "error not logged in", error: err });
  }
});

router.get("logout", async (req, res) => {
  try {
    await res.redirect("/login");
    return;
  } catch (err) {
    res.status(500).json({ message: "error not logged in", error: err });
  }
});

module.exports = router;
