const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const morgan = require("morgan");
app.use(morgan("tiny"));

const usersRoutes = require("./routes/users");
const companiesRoutes = require("./routes/companies");
const jobsRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");

app.use("/companies", companiesRoutes);
app.use("/jobs", jobsRoutes);
app.use("/users", usersRoutes);
app.use("/", authRoutes);

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

app.use(function (err, req, res, next) {
  if (err.stack) console.log(err.stack);
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
