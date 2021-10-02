const logger = require("js-logger");
const db = require("../models");
logger.useDefaults();

module.exports = {
  Query: {
    users: async () => {
      const users = await db.User.find();
      logger.info(`Get all ${users.length} users`);

      return users;
    },
    user: async (_, { id }) => {
      logger.info(`Get user with id ${id}`);

      return db.User.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      logger.info(`Creating new user with email ${email}`);

      return db.User.create({ name, email });
    },
  },
};
