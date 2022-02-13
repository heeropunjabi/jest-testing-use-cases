const { sluDependencies } = require("mathjs");
const winston = require("winston");
require("winston-mongodb");
const { format } = winston;
const logger = winston.createLogger({
  format: format.combine(
    format.timestamp(`ddd MMM DD YYYY HH:mm:ss`),
    format.prettyPrint()
  ),
  defaultMeta: { service: "user-service", "api-level": "1.0" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "info.log", level: "info" }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/winston",
      level: "info",
      collection: "logs",
      capped: true,
    }),
  ],
});

describe("Research", () => {
  it("winston transport example.", () => {
    for (let i = 0; i < 500; i++) {
      logger.info("you are simply awesome %s", i);
      logger.error("you are simply error %s", i);
    }
  });
});
