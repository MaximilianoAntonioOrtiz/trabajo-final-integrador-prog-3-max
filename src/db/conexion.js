import mysql from 'mysql2/promise';

process.loadEnvFile();

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({//se exporta porque lo tienen que usar todas las entidades
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWD
  
});