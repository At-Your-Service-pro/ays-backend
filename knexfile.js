const dotenv = require('dotenv');
dotenv.config(); // Load .env file

const isDocker = process.env.NODE_ENV === 'production';

const config = {
  client: 'pg',
  connection: isDocker
    ? process.env.DATABASE_URL
    : {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'Emoji@500',
        database: 'AYS-DB',
      },
  migrations: {
    
    directory: './src/migrations',
  },
  seeds: {
    directory: './src/seeds',
  },
};

module.exports = config;
