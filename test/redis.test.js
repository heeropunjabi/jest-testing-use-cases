const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object

// ioredis supports all Redis commands:

describe("Redis", () => {
  beforeAll(async () => {
    await redis.set("foo", "wow"); // returns promise which resolves to string, "OK"
  });
  it("Redis basic ops.", async () => {
    const result = await redis.get("foo");
    console.log(result);
    //await redis.del("foo");
  });
});
