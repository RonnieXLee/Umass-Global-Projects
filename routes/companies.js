const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const db = require("../db");

let api = new express.Router();

api.get("/", async function (_, res, next) {
  try {
    const result = await db.query(
      `SELECT code, name 
       FROM companies 
       ORDER BY name`
    );
    return res.json({ companies: result.rows });
  } catch (err) {
    next(err);
  }
});

api.get("/:code", async function (req, res, next) {
  try {
    const companyCode = req.params.code;
    const companyResult = await db.query(
      `SELECT code, name, description
       FROM companies
       WHERE code = $1`,
      [companyCode]
    );
    const invoiceResult = await db.query(
      `SELECT id
       FROM invoices
       WHERE comp_code = $1`,
      [companyCode]
    );
    if (companyResult.rows.length === 0) {
      throw new ExpressError(`No such company: ${companyCode}`, 404);
    }
    const company = companyResult.rows[0];
    const invoices = invoiceResult.rows;
    company.invoices = invoices.map(invoice => invoice.id);
    return res.json({ company: company });
  } catch (err) {
    next(err);
  }
});

api.post("/", async function (req, res, next) {
  try {
    const { name, description } = req.body;
    const code = slugify(name, { lower: true });
    const result = await db.query(
      `INSERT INTO companies (code, name, description) 
       VALUES ($1, $2, $3) 
       RETURNING code, name, description`,
      [code, name, description]
    );
    return res.status(201).json({ company: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

api.put("/:code", async function (req, res, next) {
  try {
    const { name, description } = req.body;
    const companyCode = req.params.code;
    const result = await db.query(
      `UPDATE companies
       SET name=$1, description=$2
       WHERE code = $3
       RETURNING code, name, description`,
      [name, description, companyCode]
    );
    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${companyCode}`, 404);
    }
    return res.json({ company: result.rows[0] });
  } catch (err) {
    next(err);
  }
});

api.delete("/:code", async function (req, res, next) {
  try {
    const companyCode = req.params.code;
    const result = await db.query(
      `DELETE FROM companies
       WHERE code=$1
       RETURNING code`,
      [companyCode]
    );
    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${companyCode}`, 404);
    }
    return res.json({ status: "deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = api;
