/** Database setup for BizTime. */

const { Client } = require("pg");

// Define the connection configuration
const config = {
  connectionString: "postgresql:///biztime"
};

// Create a new instance of the Client with our config
const dbClient = new Client(config);

// Connect the client to our database
dbClient.connect();

// Export the connected client for use in other parts of our application
module.exports = dbClient;
