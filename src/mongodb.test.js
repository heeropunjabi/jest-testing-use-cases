//const { MongoClient, Decimal128 } = require("mongodb");
const BigNumber = require("bignumber.js");
BigNumber.config({ DECIMAL_PLACES: 18 });
const BN = require("bn.js");
const Web3 = require("web3");
let web3 = new Web3("");

//const { ethers } = require("ethers");

describe("insert", () => {
  let connection;
  let db;

  // beforeAll(async () => {
  //   //console.log(`sahi hai bhai ${global.__MONGO_URI__}`);
  //   connection = await MongoClient.connect(global.__MONGO_URI__, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   // console.log(`db name is ${global.__MONGO_DB_NAME__}`);
  //   db = await connection.db(global.__MONGO_DB_NAME__);
  // });

  // afterAll(async () => {
  //   //await db.close();
  //   await connection.close();
  // });

  it("should insert a doc into collection", async () => {
    console.log("ok");

    let x = new BigNumber("104030000000000000000");

    let y = new BigNumber("4873157353238674109");
    console.log(`answer is ${x.dividedBy(y)}`);

    // let a = web3.utils
    //   .toBN("104030000000000000000")
    //   .div(web3.utils.toBN("4873157353238674109"))
    //   .toString();

    let a = new BN("104030000000000000000");
    let b = new BN("4873157353238674109");
    let c = a.divmod(b);
    console.log(`ok ${JSON.stringify(c)}`);
    console.log(`ok ${web3.utils.hexToNumber(c.div)}`);
    console.log(`ok ${web3.utils.hexToNumberString(c.mod)}`);

    let mod = new BN(web3.utils.hexToNumberString(c.mod));

    let DivMod = mod.mul(new BN(10));

    let final = "";

    let i = 0;
    while (i <= 18 || DivMod == 0) {
      c = DivMod.divmod(b);

      final += web3.utils.hexToNumberString(c.div);
      mod = new BN(web3.utils.hexToNumberString(c.mod));
      DivMod = mod.mul(new BN(10));
      i++;
    }
    final = web3.utils.hexToNumber(c.div) + "." + final;
    console.log(`final ${final}`);

    //let b = ;

    //console.log(`ok ok ${a}`);

    // let a = new BN("104030000000000000000");
    // let b = new BN("4873157353238674109");
    // console.log(`answer is ${a.idivn(b)}`);

    // const users = db.collection("users");
    // const mockUser = [
    //   {
    //     _id: "1",
    //     spot: "10",
    //   },
    //   {
    //     _id: "2",
    //     spot: "20",
    //   },
    //   {
    //     _id: "3",
    //     spot: "30",
    //   },
    //   {
    //     _id: "4",
    //     spot: "40",
    //   },
    // ];
    // const inserted = await users.insertMany(mockUser);
    // // const x = await users
    // //   .aggregate([
    // //     {
    // //       $project: {
    // //         _id: "1",
    // //         greater: { $divide: [{ $toDecimal: "$spot" }, 5] },
    // //       },
    // //     },
    // //   ])
    // //   .next();
    // const x = await users
    //   .aggregate([
    //     {
    //       $match: {
    //         spot: {
    //           $gte: "40",
    //         },
    //       },
    //     },
    //   ])
    //   .toArray();
    // console.log(JSON.stringify(x));
  });
});
