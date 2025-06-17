const config = {
    client: 'pg', // Specify the database client (e.g., 'pg' for PostgreSQL)
    connection: {
      host: 'localhost',
      port: 5432, // Specify the port number (default: 5432)
      user: 'postgres',
      password: 'Emoji@500',
      database: 'AYS-DB',
    },
    migrations: {
      directory: './src/migrations', // Folder for migration files
    },
    seeds: { 
      directory: './src/seeds', // Folder for seed files 
    },
  };
  
  module.exports = config;
  