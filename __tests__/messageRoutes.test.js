const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const Message = require("../models/message");
const { SECRET_KEY } = require("../config");

describe("Message Routes Test", function () {
  let testUserToken;

  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");
    await db.query("ALTER SEQUENCE messages_id_seq RESTART WITH 1");

    const users = [
      {
        username: "test1",
        password: "password",
        first_name: "Test1",
        last_name: "Testy1",
        phone: "+14155550000",
      },
      {
        username: "test2",
        password: "password2",
        first_name: "Test2",
        last_name: "Testy2",
        phone: "+14155552222",
      },
      {
        username: "test3",
        password: "password3",
        first_name: "Test3",
        last_name: "Testy3",
        phone: "+14155553333",
      },
    ];

    const messages = [
      {
        from_username: "test1",
        to_username: "test2",
        body: "test1 -> test2",
      },
      {
        from_username: "test2",
        to_username: "test1",
        body: "test2 -> test1",
      },
      {
        from_username: "test2",
        to_username: "test3",
        body: "test2 -> test3",
      },
    ];

    await Promise.all(users.map((user) => User.register(user)));

    await Promise.all(messages.map((message) => Message.create(message)));

    testUserToken = jwt.sign({ username: "test1" }, SECRET_KEY);
  });

  /** GET /messages/:id => {message}  */

  describe("GET /messages/:id", function () {
    test("can get message from user", async function () {
      const response = await request(app)
        .get("/messages/1")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.body).toEqual({
        message: {
          id: 1,
          body: "test1 -> test2",
          sent_at: expect.any(String),
          read_at: null,
          from_user: {
            username: "test1",
            first_name: "Test1",
            last_name: "Testy1",
            phone: "+14155550000",
          },
          to_user: {
            username: "test2",
            first_name: "Test2",
            last_name: "Testy2",
            phone: "+14155552222",
          },
        },
      });
    });

    test("can get message to user", async function () {
      const response = await request(app)
        .get("/messages/2")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.body).toEqual({
        message: {
          id: 2,
          body: "test2 -> test1",
          sent_at: expect.any(String),
          read_at: null,
          to_user: {
            username: "test1",
            first_name: "Test1",
            last_name: "Testy1",
            phone: "+14155550000",
          },
          from_user: {
            username: "test2",
            first_name: "Test2",
            last_name: "Testy2",
            phone: "+14155552222",
          },
        },
      });
    });

    test("bad message id", async function () {
      const response = await request(app)
        .get("/messages/999")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.statusCode).toEqual(404);
    });

    test("can't get message not to/from user", async function () {
      const response = await request(app)
        .get("/messages/3")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.statusCode).toEqual(401);
    });
  });

  /** POST / => {message} */

  describe("POST /", function () {
    test("can post message", async function () {
      const response = await request(app)
        .post("/messages/")
        .send({
          to_username: "test2",
          body: "another test1 -> test2",
        })
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.body).toEqual({
        message: {
          id: 4,
          sent_at: expect.any(String),
          from_username: "test1",
          to_username: "test2",
          body: "another test1 -> test2",
        },
      });
    });

    test("cannot send to bad username", async function () {
      const response = await request(app)
        .post("/messages/")
        .send({
          to_username: "wrong",
          body: "body here",
        })
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.statusCode).toEqual(500);
    });
  });

  /** POST /messages/:id/read => {message: id, read_at}  */

  describe("POST /messages/:id/read", function () {
    test("can mark users messages read", async function () {
      const response = await request(app)
        .post("/messages/2/read")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.body).toEqual({
        message: {
          id: 2,
          read_at: expect.any(String),
        },
      });
    });

    test("bad message id", async function () {
      const response = await request(app)
        .post("/messages/999/read")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.statusCode).toEqual(404);
    });

    test("can't mark other messages read", async function () {
      const response = await request(app)
        .post("/messages/1/read")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.statusCode).toEqual(401);
    });
  });
});

afterAll(async function () {
  await db.end();
});
