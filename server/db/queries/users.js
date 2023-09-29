const db = require('../connection');

const createNewUser = function(user) {
  const {username, email, password} = user;
  const dbquery = `INSERT INTO "users" (username, email, password) VALUES ($1, $2, $3) RETURNING *;`
  return db.
  query(dbquery , [username, email, password])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
}

const getUser = function(email) {
  const dbquery = `SELECT * FROM users WHERE email = $1;`
  return db.
  query(dbquery, [email])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
}

const createInvalidToken = function(token) {
  const dbquery = `INSERT INTO "invalid_tokens" (token) VALUES ($1) RETURNING *;`
  return db.
  query(dbquery , [token])
  .then(result => result.rows[0])
  .catch(err => console.log(err));
}

const getInvalidToken = function(token) {
  const dbquery = `SELECT * FROM invalid_tokens WHERE token = $1;`
  return db.
  query(dbquery , [token])
  .then(result => result.rows[0])
  .catch(err => console.log(err));

}
module.exports = { createNewUser, getUser, createInvalidToken, getInvalidToken };