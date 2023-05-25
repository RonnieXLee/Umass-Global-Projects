/** BizTime express application. */

const express = require("express");

const AppError = require("./appError");
const companiesRoutes = require("./routes/companies");
const invoicesRoutes = require("./routes/invoices");

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use("/companies", companiesRoutes);
app.use("/invoices", invoicesRoutes);

/** 404 handler */
app.use((req, res, next) => {
  const err = new AppError("Not Found", 404);
  next(err);
});

/** general error handler */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err;
  const message = err.message;

  res.status(status).json({ error, message });
});

module.exports = app;
