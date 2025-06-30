const dotenv = require('dotenv');
dotenv.config(); // Load .env file

// const isDocker = process.env.NODE_ENV === 'production';

const config = {
  client: 'pg',
  connection: {
        host: 'database-1.cvkau2m8ontm.eu-north-1.rds.amazonaws.com',
        port: 5432,
        user: 'postgres',
        password: 'Emoji12345678',
        database: 'AYSDB',
      },
  migrations: {
    
    directory: './src/migrations',
  },
  seeds: {
    directory: './src/seeds',
  },
};

module.exports = config;
