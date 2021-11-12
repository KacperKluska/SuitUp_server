require('dotenv').config();

const typeorm = require('typeorm');

async function connect() {
  try {
    return await typeorm.createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      database: 'SuitUp',
      synchronize: false,
      logging: false,
      migrationsTableName: 'migration_table',
      migrations: ['../migrations/*.js'],
      cli: {
        migrationsDir: '../migrations',
      },
      entities: ['../schemas/*.js'],
    });
  } catch (error) {
    console.log(`Couldn't connect to the database. ${error}`);
    return null;
  }
}

module.exports = { connect };
