const Promise = require("bluebird");
const express = require("express");
const http = require("http");
const { MongoClient } = require("mongodb");
const { ParseServer } = require("parse-server");

let connection;
let db;

const connectDB = async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db = await connection.db(global.__MONGO_DB_NAME__);
  const users = db.collection("users");
  const inserted = await users.insertOne({
    _id: "1",
    spot: "10",
  });
};

let parseServerState = {};

const dropDB = async () => {
  await connection.close();
};

/**
 * Starts the ParseServer instance
 * @param {Object} parseServerOptions Used for creating the `ParseServer`
 * @return {Promise} Runner state
 */
async function startParseServer() {
  await connectDB();

  const databaseURI = global.__MONGO_URI__ + global.__MONGO_DB_NAME__,
    masterKey = "test",
    javascriptKey = "test",
    appId = "test",
    port = 30001,
    mountPath = "/1",
    serverURL = `http://localhost:${port}${mountPath}`;

  let parseServerOptions = {
    masterKey,
    javascriptKey,
    appId,
    databaseURI,
    serverURL,
    silent: process.env.VERBOSE !== "1",
  };
  const app = express();
  const parseServer = new ParseServer(parseServerOptions);

  app.use(mountPath, parseServer);

  return http.createServer(app).listen(port);
  //Promise.promisifyAll(httpServer);

  //await httpServer.listenAsync(port);

  //   return startDB()
  //     .then(() => connectDB(databaseURI))
  //     .then((mongoConnection) => {
  //       parseServerOptions = Object.assign(
  //         {
  //           masterKey,
  //           javascriptKey,
  //           appId,
  //           serverURL,
  //           databaseURI,
  //           silent: process.env.VERBOSE !== "1",
  //         },
  //         parseServerOptions
  //       );
  //       const app = express();
  //       const parseServer = new ParseServer(parseServerOptions);

  //       app.use(mountPath, parseServer);

  //       const httpServer = http.createServer(app);

  //       Promise.promisifyAll(httpServer);
  //       Promise.promisifyAll(mongoConnection);

  //       return httpServer.listenAsync(port).then(() =>
  //         Object.assign(parseServerState, {
  //           parseServer,
  //           httpServer,
  //           mongoConnection,
  //           expressApp: app,
  //           parseServerOptions,
  //         })
  //       );
  //     });
}

/**
 * Stops the ParseServer instance
 * @return {Promise}
 */
function stopParseServer() {
  const { httpServer } = parseServerState;
  return httpServer
    .closeAsync()
    .then(stopDB)
    .then(() => (parseServerState = {}));
}

describe("hello", () => {
  it("ok", async (done) => {
    let masterKey = "test";
    let javascriptKey = "test";
    let appId = "test";
    await startParseServer();
    console.log(`i am her`);
    await Parse.initialize(appId, javascriptKey, masterKey);
    Parse.serverURL = "http://localhost:30001/1";
    const q = new Parse.Query("users");
    const output = await q.limit(5).find();
    console.log(`o`, JSON.stringify(output));
    Parse.Cloud.define("hello", () => {
      console.log("dudue");
      return "Hello";
    });

    Parse.Cloud.run("hello")
      .then((r) => {
        console.log(r);
        done();
      })
      .catch((e) => {
        done(e);
      });

    // .then((r) => {
    //   console.log("r", r);
    //   done();
    // })
    // .catch((e) => {
    //   console.log(`ok ok `);
    //   done(e);
    // });
  });
});

// ...
// describe("my spec", (done) => {
//   beforeAll(async (done) => {
//     const appId = "test";
//     const masterKey = "test";
//     const javascriptKey = "test";

//     await startParseServer({ appId, masterKey, javascriptKey });

//     await Parse.initialize(appId, masterKey, javascriptKey);
//     Parse.serverURL = "http://localhost:30001/1";

//     done();
//     //.catch(done.fail);
//   });

//   //   afterAll((done) => {
//   //     stopParseServer().then(done).catch(done.fail);
//   //   });

//   //   beforeEach((done) => {
//   //     dropDB().then(done).catch(done.fail);
//   //   });

//   it("should work", (done) => {
//     const q = new Parse.Query("_Installation");
//     q.limit(5)
//       .find({ useMasterKey: true })
//       .then(console.log)
//       .then(done)
//       .catch(done.fail);
//   });
// });
