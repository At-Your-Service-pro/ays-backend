const dotenv = require('dotenv');
dotenv.config(); // Load .env file

// const isDocker = process.env.NODE_ENV === 'production';

const config = {
  client: 'pg',
  connection: {
         host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD), // Explicit string cast
    database: process.env.DB_NAME,
    // ssl: { rejectUnauthorized: false }
      },
  migrations: {
    directory: './src/migrations', 
  },
  seeds: {
    directory: './src/seeds',
  },
};

module.exports = config;
