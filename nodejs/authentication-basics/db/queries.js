const pool = require("./pool");

const getUser = async ({ username, id }) => {
  const {
    rows: [user],
  } = await pool.query(
    `
    SELECT * FROM users WHERE username = $1 or id = $2
    `,
    [username, id]
  );
  return user;
};

const createUser = async ({ username, password }) => {
  /*
   *  This is not a particularly safe way to create users in your database
   *  For the moment we are saving our users with just a plain text password.
   *  This is a really bad idea for any real-world project.
   *  At the end of this lesson, you will learn how to properly secure these passwords using bcrypt.
   */
  await pool.query(
    `
    INSERT INTO users (username, password) VALUES ($1, $2)
    `,
    [username, password]
  );
};

module.exports = {
  getUser,
  createUser,
};
