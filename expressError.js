/** ExpressError extends the built-in Error class in JavaScript, allowing us to
 *  attach a status property for error-handling middleware to use.
 *
 *  It also logs the stack trace upon creation for easier debugging.
 */

class CustomExpressError extends Error {
  constructor(message, status) {
    super(message);  // Pass message to the base Error class
    this.status = status;
    // Log the error stack trace to the console
    if (process.env.NODE_ENV !== 'production') {
      console.error(this.stack);
    }
  }
}

module.exports = CustomExpressError;
