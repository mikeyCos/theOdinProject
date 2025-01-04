const { Pool } = require("pg");
const env = require("../utils/environment");

module.exports = new Pool({
  host: "localhost",
  user: env.dbuser,
  database: "top_users",
  password: env.dbpassword,
  port: 5432,
});
