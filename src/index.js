require("dotenv/config");
const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("js-logger");
const responseTime = require("response-time");
const resolvers = require("./resolvers/resolvers");

logger.useDefaults();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => logger.info("Database connected successfully"))
  .catch(() => logger.error("Database connection error"));

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, "schemas/schema.graphql"),
  resolvers,
});

server.use(responseTime());

server.start().then(() => logger.info("Running in port 4000"));
