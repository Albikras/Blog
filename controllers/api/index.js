const router = require("express").Router();

const loginRoutes = require("./loginRoutes");
const postRoutes = require("./postRoutes");
const commentRoute = require("./commentRoute");

router.use("/users", loginRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoute);

module.exports = router;
