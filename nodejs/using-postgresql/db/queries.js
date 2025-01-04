const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function getUsers(query) {
  console.log(query);
  const { rows } = await pool.query(
    "SELECT * FROM USERNAMES WHERE username ILIKE '%'|| $1 || '%'",
    [query]
  );
  return rows;
}

async function insertUser(user) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [user]);
}

async function deleteUsers() {
  await pool.query("DELETE FROM USERNAMES");
}

module.exports = { getAllUsers, getUsers, insertUser, deleteUsers };
