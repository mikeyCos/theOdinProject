const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: `postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@localhost:5432/top_users`,
};
