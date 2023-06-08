const bcrypt = require("bcrypt");
const db = require("../db");
const ExpressError = require("../helpers/expressError");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  static async register({
    username,
    password,
    first_name,
    last_name,
    email,
    phone,
  }) {
    // FIXES BUG #1
    // Include password in the RETURNING clause to return the hashed password
    const result = await db.query(
      `INSERT INTO users 
          (username, password, first_name, last_name, email, phone) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING username, password, first_name, last_name, email, phone`,
      [username, hashedPassword, first_name, last_name, email, phone]
    );

    return result.rows[0];
  }

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT password 
        FROM users 
        WHERE username = $1`,
      [username]
    );

    let user = result.rows[0];

    // FIXES BUG #2
    // Throw an error with status 401 when the username/password combination is incorrect
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new ExpressError('Cannot authenticate', 401);
    }
  }

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    let { query, values } = sqlForPartialUpdate(
      "users",
      data,
      "username",
      username
    );

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }

    delete user.password;
    delete user.is_admin;

    return user;
  }

  static async findAll() {
    // FIXES BUG #3
    // Include the username field in the SELECT query
    const result = await db.query(
      `SELECT username, first_name, last_name, email 
        FROM users 
        ORDER BY username`
    );

    return result.rows;
  }

  static async findOne(username) {
    const userRes = await db.query(
      `SELECT username,
                first_name,
                last_name,
                email,
                phone,
                photo_url,
                is_admin
          FROM users
          WHERE username = $1`,
      [username]
    );

    const user = userRes.rows[0];

    // FIXES BUG #4
    // Throw an error with status 404 when the user cannot be found
    if (!user) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }

    return user;
  }

  static async delete(username) {
    // FIXES BUG #5
    // Call the delete method on the User model
    await User.remove(username);
  }

  static async remove(username) {
    await db.query(
      `DELETE FROM users 
        WHERE username = $1 
        RETURNING username`,
      [username]
    );
  }
}

module.exports = User;
