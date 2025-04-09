const { poolConnect, sql } = require('../config/db');


const getAll = async () => {
  await poolConnect;
  const result = await sql.query`SELECT id, name, email FROM Users`; 
  return result.recordset;
};


const getById = async (id) => {
  await poolConnect;
  const result = await sql.query`
    SELECT id, name, email FROM Users WHERE id = ${id}
  `;
  return result.recordset[0];
};


const create = async ({ name, email, password }) => {
  await poolConnect;
  const result = await sql.query`
    INSERT INTO Users (name, email, password)
    OUTPUT INSERTED.id
    VALUES (${name}, ${email}, ${password})
  `;
  return result.recordset[0].id;
};


const update = async (id, { name, email }) => {
  await poolConnect;
  const result = await sql.query`
    UPDATE Users
    SET name = ${name}, email = ${email}
    WHERE id = ${id}
  `;
  return result.rowsAffected[0] > 0;
};


const remove = async (id) => {
  await poolConnect;
  const result = await sql.query`
    DELETE FROM Users WHERE id = ${id}
  `;
  return result.rowsAffected[0] > 0;
};


const findByEmail = async (email) => {
  await poolConnect;
  const result = await sql.query`
    SELECT * FROM Users WHERE email = ${email}
  `;
  return result.recordset[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  findByEmail,
};
