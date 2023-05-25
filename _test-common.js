/** test setup code */

const db = require("./db");

async function initData() {
  await db.query("DELETE FROM invoices");
  await db.query("DELETE FROM companies");
  await db.query("SELECT setval('invoices_id_seq', 1, false)");

  const companies = [
    ['apple', 'Apple', 'Maker of OSX.'],
    ['ibm', 'IBM', 'Big blue.'],
  ];

  for (let company of companies) {
    await db.query(`INSERT INTO companies (code, name, description)
                      VALUES ($1, $2, $3)`, company);
  }

  const invoices = [
    ['apple', 100, false, '2018-01-01', null],
    ['apple', 200, true, '2018-02-01', '2018-02-02'],
    ['ibm', 300, false, '2018-03-01', null]
  ];

  for (let invoice of invoices) {
    await db.query(`INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
                      VALUES ($1, $2, $3, $4, $5)
                      RETURNING id`, invoice);
  }
}

module.exports = { initData };
