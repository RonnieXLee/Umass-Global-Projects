const Router = require("express").Router;
const User = require("../models/user");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const router = new Router();

/** Get list of users.
 *
 * GET /
 * Response: { users: [{username, first_name, last_name, phone}, ...] }
 *
 **/
router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const users = await User.all();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** Get details of a user.
 *
 * GET /:username
 * Response: { user: {username, first_name, last_name, phone, join_at, last_login_at} }
 *
 **/
router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** Get messages to a user.
 *
 * GET /:username/to
 * Response: { messages: [{id, body, sent_at, read_at, from_user: {username, first_name, last_name, phone}}, ...] }
 *
 **/
router.get("/:username/to", ensureCorrectUser, async function (req, res, next) {
  try {
    const messages = await User.messagesTo(req.params.username);
    return res.json({ messages });
  } catch (err) {
    return next(err);
  }
});

/** Get messages from a user.
 *
 * GET /:username/from
 * Response: { messages: [{id, body, sent_at, read_at, to_user: {username, first_name, last_name, phone}}, ...] }
 *
 **/
router.get("/:username/from", ensureCorrectUser, async function (req, res, next) {
  try {
    const messages = await User.messagesFrom(req.params.username);
    return res.json({ messages });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
