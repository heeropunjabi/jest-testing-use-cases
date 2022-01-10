const { MongoClient, Decimal128 } = require("mongodb");
//const { ethers } = require("ethers");

describe.skip("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    //console.log(`sahi hai bhai ${global.__MONGO_URI__}`);
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`db name is ${global.__MONGO_DB_NAME__}`);
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    //await db.close();
    await connection.close();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");
    const mockUser = [
      {
        _id: "1",
        spot: "10",
      },
      {
        _id: "2",
        spot: "20",
      },
      {
        _id: "3",
        spot: "30",
      },
      {
        _id: "4",
        spot: "40",
      },
    ];
    const inserted = await users.insertMany(mockUser);
    // const x = await users
    //   .aggregate([
    //     {
    //       $project: {
    //         _id: "1",
    //         greater: { $divide: [{ $toDecimal: "$spot" }, 5] },
    //       },
    //     },
    //   ])
    //   .next();
    const x = await users
      .aggregate([
        {
          $match: {
            spot: {
              $gte: "40",
            },
          },
        },
      ])
      .toArray();
    console.log(JSON.stringify(x));
  });
});
