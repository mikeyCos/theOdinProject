const { Client } = require("pg");
const env = require("../utils/environment");

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username)
VALUES
  ('Hank'),
  ('Bill'),
  ('Dale');
`;

async function main() {
  const client = new Client({
    connectionString: `postgresql://${env.dbuser}:${env.dbpassword}@localhost:5432/top_users`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

main();
