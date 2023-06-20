const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userSeed");
const postData = require("./postSeed");
const commentData = require("./commentSeed");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  try {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);
    console.log("Seeded Successfully!");
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

seedDatabase();
