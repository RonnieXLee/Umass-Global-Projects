/** Routes for invoices. */

const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const invoices = await db.query(`SELECT id, comp_code FROM invoices ORDER BY id`);
    res.json({ invoices: invoices.rows });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const invoiceData = await db.query(
      `SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.name, c.description 
       FROM invoices AS i
       INNER JOIN companies AS c ON (i.comp_code = c.code)  
       WHERE id = $1`,
      [id]
    );

    if (invoiceData.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`,404);
    }

    const data = invoiceData.rows[0];
    const invoice = {
      id: data.id,
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date,
      company: {
        code: data.comp_code,
        name: data.name,
        description: data.description,
      }
    };

    res.json({ invoice });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const newInvoice = await db.query(
      `INSERT INTO invoices (comp_code, amt) 
       VALUES ($1, $2) 
       RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [comp_code, amt]
    );

    res.json({ invoice: newInvoice.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { amt, paid } = req.body;
    const id = req.params.id;
    let paidDate;

    const currentInvoice = await db.query(
      `SELECT paid
       FROM invoices
       WHERE id = $1`,
      [id]
    );

    if (currentInvoice.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    const currentPaidDate = currentInvoice.rows[0].paid_date;

    paidDate = !currentPaidDate && paid ? new Date() : (!paid ? null : currentPaidDate);

    const updatedInvoice = await db.query(
      `UPDATE invoices
       SET amt=$1, paid=$2, paid_date=$3
       WHERE id=$4
       RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [amt, paid, paidDate, id]
    );

    res.json({ invoice: updatedInvoice.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedInvoice = await db.query(
      `DELETE FROM invoices
       WHERE id = $1
       RETURNING id`,
      [id]
    );

    if (deletedInvoice.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    return res.json({"status": "deleted"});
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;