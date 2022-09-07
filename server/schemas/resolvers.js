const { AuthenticationError } = require("apollo-server-express");
const { assertNamedType } = require("graphql");
const { User, Post, Game } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts")
          .populate("krossies")
          .populate("games");

        return userData;
      }
      throw new AuthenticationError("Please log in first!");
    },
    //get all posts
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    //get post by id
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("krossies")
        .populate("posts")
        .populate("games");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("krossies")
        .populate("posts")
        .populate("games");
    },
    game: async (parent, { gamename }) => {
      return Game.findOne({ gamename }).select("-__v ").populate("users");
    },
    games: async () => {
      return Game.find().populate("users");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "Sorry! Those credentials are incorrect!"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "Sorry! Those credentials are incorrect!"
        );
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );
        return post;
      }
      throw new AuthenticationError("Please log in first!");
    },
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError("Please log in first!");
    },
    addKrossie: async (parent, { krossieId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { krossies: krossieId } },
          { new: true }
        ).populate("krossies");

        return updatedUser;
      }
      throw new AuthenticationError("Please log in first!");
    },
    addGame: async (parent, { gamename }, context) => {
      const game = await Game.create(
        { gamename }
        // { $addToSET: { users: context.user.id } }
      );

      return game;
    },
    // ,
    // addToExistingGame: async (parent, { gameId }, context) => {
    //   const game = await Game.findOneAndUpdate(
    //     { _id: gameId },
    //     { $addToSET: { users: context.user.id } }
    //   );

    //   return game;
    // }
  },
};

module.exports = resolvers;
