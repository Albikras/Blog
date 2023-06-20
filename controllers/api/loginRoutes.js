/**
 * all required variables whether it be an import or a library
 */
const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log("user logged", userData);
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData);

    if (!userData) {
      res.status(400).json({ message: "Incorrect email" });
    }
    const userPassword = await userData.checkPassword(req.body.password);

    if (!userPassword) {
      res.status(400).json({ message: "password, please try again" });
      return;
    }
    console.log(userPassword);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      console.log("user logged", userData);
      res.json({ user: userData, message: "Logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
