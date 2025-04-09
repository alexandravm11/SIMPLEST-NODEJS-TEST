// src/utils/init-db.js
const { poolConnect, pool, sql } = require('../config/db');

async function initializeDatabase() {
  await poolConnect;

  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'UserDB')
    BEGIN
      CREATE DATABASE UserDB
    END
  `);

  const newPool = await sql.connect({ ...pool.config, database: 'UserDB' });

  await newPool.request().query(`
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
    BEGIN
      CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        createdAt DATETIME DEFAULT GETDATE()
      )
    END
  `);


}

module.exports = initializeDatabase;
