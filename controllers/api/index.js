const router = require("express").Router();
const loginRoutes = require("./loginRoutes");
const postRoutes = require("./postRoutes");

router.use("/login", loginRoutes);
router.use("/post", postRoutes);

module.exports = router;
