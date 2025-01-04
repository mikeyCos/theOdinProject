require("dotenv").config();

module.exports = {
  dbpassword: process.env.DBPASSWORD,
  dbuser: process.env.DBUSER,
  port: process.env.PORT,
};
