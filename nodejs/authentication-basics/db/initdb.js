const { Client } = require("pg");
const { DATABASE_URL } = require("../utils/environment");

const USERS_QUERY = `
CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 )
);
`;

const initDB = async () => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  await client.connect();
  await client.query(USERS_QUERY);
  await client.end();
};

initDB();
