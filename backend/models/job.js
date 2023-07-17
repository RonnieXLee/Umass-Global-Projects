const db = require("../db");
const sqlForPartialUpdate = require("../helpers/partialUpdate");

class Job {
  static async findAll(data, username) {
    let baseQuery = `
      SELECT id, title, company_handle, salary, equity, a.state 
      FROM jobs 
        LEFT OUTER JOIN applications AS a on a.job_id = id AND a.username = $1`;
    let whereExpressions = [];
    let queryValues = [username];

    if (data.min_salary) {
      queryValues.push(+data.min_employees);
      whereExpressions.push(`min_salary >= $${queryValues.length}`);
    }

    if (data.max_equity) {
      queryValues.push(+data.max_employees);
      whereExpressions.push(`min_equity >= $${queryValues.length}`);
    }

    if (data.search) {
      queryValues.push(`%${data.search}%`);
      whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      baseQuery += " WHERE ";
    }

    let finalQuery = baseQuery + whereExpressions.join(" AND ");
    const jobsRes = await db.query(finalQuery, queryValues);
    return jobsRes.rows;
  }

  static async findOne(id) {
    const jobRes = await db.query(
      `SELECT id, title, salary, equity, company_handle 
         FROM jobs 
         WHERE id = $1`,
      [id]
    );

    const job = jobRes.rows[0];

    if (!job) {
      const error = new Error(`There exists no job '${id}'`);
      error.status = 404;
      throw error;
    }

    const companiesRes = await db.query(
      `SELECT name, num_employees, description, logo_url 
        FROM companies 
        WHERE handle = $1`,
      [job.company_handle]
    );

    job.company = companiesRes.rows[0];

    return job;
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO jobs (title, salary, equity, company_handle) 
           VALUES ($1, $2, $3, $4) 
           RETURNING id, title, salary, equity, company_handle`,
      [data.title, data.salary, data.equity, data.company_handle]
    );

    return result.rows[0];
  }

  static async update(id, data) {
    let { query, values } = sqlForPartialUpdate(
      "jobs",
      data,
      "id",
      id
    );

    const result = await db.query(query, values);
    const job = result.rows[0];

    if (!job) {
      let notFound = new Error(`There exists no job '${id}`);
      notFound.status = 404;
      throw notFound;
    }

    return job;
  }

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM jobs 
          WHERE id = $1 
          RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      let notFound = new Error(`There exists no job '${id}`);
      notFound.status = 404;
      throw notFound;
    }
  }

  static async apply(id, username, state) {
    const result = await db.query(
      `SELECT id 
        FROM jobs 
        WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      let notFound = new Error(`There exists no job '${id}`);
      notFound.status = 404;
      throw notFound;
    }

    await db.query(
      `INSERT INTO applications (job_id, username, state) 
        VALUES ($1, $2, $3)`,
      [id, username, state]
    );
  }
}

module.exports = Job;
