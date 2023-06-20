const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./postData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  try {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    await Post.bulkCreate();
    await Comment.bulkCreate();
    console.log("Seeded Successfully!");
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

seedDatabase();
