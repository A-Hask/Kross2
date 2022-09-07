const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  gamename: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Game = model("Game", gameSchema);

module.exports = Game;
