const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

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
