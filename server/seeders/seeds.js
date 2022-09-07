const userSeeds = require("./userSeed.json");
const gameSeeds = require("./gameSeed.json");
const postSeeds = require("./postSeed.json");
const db = require("../config/connection");
const { Post, User, Game } = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Game.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const game = await Game.create(gameSeeds[i]);
      const post = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: post.username },
        {
          $push: {
            posts: post._id,
            games: game._id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
