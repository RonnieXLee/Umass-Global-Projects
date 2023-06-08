const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const Message = require("../models/message");
const { SECRET_KEY } = require("../config");

describe("User Routes Test", function () {
  let testUserToken;

  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");

    const user = {
      username: "test1",
      password: "password",
      first_name: "Test1",
      last_name: "Testy1",
      phone: "+14155550000",
    };

    await User.register(user);

    testUserToken = jwt.sign({ username: "test1" }, SECRET_KEY);
  });

  /** GET /users => {users: [...]}  */

  test("can get list of users", async function () {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${testUserToken}`);

    expect(response.body).toEqual({
      users: [
        {
          username: "test1",
          first_name: "Test1",
          last_name: "Testy1",
          phone: "+14155550000",
        },
      ],
    });
  });

  /** GET /users => {users: [...]}  */

  describe("GET /users/:username", function () {
    test("can get user", async function () {
      const response = await request(app)
        .get("/users/test1")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.body).toEqual({
        user: {
          username: "test1",
          first_name: "Test1",
          last_name: "Testy1",
          phone: "+14155550000",
          join_at: expect.any(String),
          last_login_at: expect.any(String),
        },
      });
    });

    test("401 on missing user", async function () {
      const response = await request(app)
        .get("/users/wrong")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.statusCode).toEqual(401);
    });
  });
});

describe("User Messages Routes Test", function () {
  let testUserToken;

  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");

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
    ];

    await Promise.all(users.map((user) => User.register(user)));

    await Promise.all(messages.map((message) => Message.create(message)));

    testUserToken = jwt.sign({ username: "test1" }, SECRET_KEY);
  });

  /** GET /users/:username/to => {messages: [...]}  */

  describe("GET /users/:username/to", function () {
    test("can get list of messages for user", async function () {
      const response = await request(app)
        .get("/users/test1/to")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.body).toEqual({
        messages: [
          {
            id: expect.any(Number),
            body: "test2 -> test1",
            sent_at: expect.any(String),
            read_at: null,
            from_user: {
              username: "test2",
              first_name: "Test2",
              last_name: "Testy2",
              phone: "+14155552222",
            },
          },
        ],
      });
    });

    test("401 on non-existent user", async function () {
      const response = await request(app)
        .get("/users/wrong/to")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.statusCode).toEqual(401);
    });

    test("401 on wrong auth", async function () {
      const response = await request(app)
        .get("/users/test1/to")
        .set("Authorization", "Bearer wrong");

      expect(response.statusCode).toEqual(401);
    });
  });

  /** GET /users/:username/from => {messages: [...]}  */

  describe("GET /users/:username/from", function () {
    test("can get list of messages from user", async function () {
      const response = await request(app)
        .get("/users/test1/from")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.body).toEqual({
        messages: [
          {
            id: expect.any(Number),
            body: "test1 -> test2",
            sent_at: expect.any(String),
            read_at: null,
            to_user: {
              username: "test2",
              first_name: "Test2",
              last_name: "Testy2",
              phone: "+14155552222",
            },
          },
        ],
      });
    });

    test("401 on non-existent user", async function () {
      const response = await request(app)
        .get("/users/wrong/from")
        .set("Authorization", `Bearer ${testUserToken}`);

      expect(response.statusCode).toEqual(401);
    });

    test("401 on wrong auth", async function () {
      const response = await request(app)
        .get("/users/test1/from")
        .set("Authorization", "Bearer wrong");

      expect(response.statusCode).toEqual(401);
    });
  });
});

afterAll(async function () {
  await db.end();
});
