require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: 'SuitUpDB',
  synchronize: true,
  logging: false,
  migrationsTableName: 'migration_table',
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
  entities: ['schemas/*.js'],
};
