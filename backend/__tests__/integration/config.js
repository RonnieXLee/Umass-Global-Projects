const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("../../app");
const db = require("../../db");

const TEST_DATA = {};

async function beforeAllHook() {}

async function beforeEachHook(TEST_DATA) {
  try {
    const hashedPassword = await bcrypt.hash("secret", 1);
    await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, is_admin)
                  VALUES ('test', $1, 'tester', 'mctest', 'test@rithmschool.com', true)`,
      [hashedPassword]
    );

    const response = await request(app)
      .post("/login")
      .send({
        username: "test",
        password: "secret",
      });

    TEST_DATA.userToken = response.body.token;
    TEST_DATA.currentUsername = jwt.decode(TEST_DATA.userToken).username;

    const result = await db.query(
      "INSERT INTO companies (handle, name, num_employees) VALUES ($1, $2, $3) RETURNING *",
      ["rithm", "rithm inc", 1000]
    );

    TEST_DATA.currentCompany = result.rows[0];

    const newJob = await db.query(
      "INSERT INTO jobs (title, salary, company_handle) VALUES ('Software Engineer', 100000, $1) RETURNING *",
      [TEST_DATA.currentCompany.handle]
    );
    TEST_DATA.jobId = newJob.rows[0].id;

    const newJobApp = await db.query(
      "INSERT INTO applications (job_id, username) VALUES ($1, $2) RETURNING *",
      [TEST_DATA.jobId, TEST_DATA.currentUsername]
    );
    TEST_DATA.jobApp = newJobApp.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function afterEachHook() {
  try {
    await db.query("DELETE FROM applications");
    await db.query("DELETE FROM jobs");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM companies");
  } catch (error) {
    console.error(error);
  }
}

async function afterAllHook() {
  try {
    await db.end();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  afterAllHook,
  afterEachHook,
  TEST_DATA,
  beforeAllHook,
  beforeEachHook,
};
