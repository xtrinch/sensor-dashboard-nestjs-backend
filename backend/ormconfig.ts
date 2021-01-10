module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: process.env.DB_ENTITIES.split(' '),
  dropSchema: process.env.DB_DROP_SCHEMA === 'true',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  autoLoadEntities: true,
  logging: process.env.DB_LOGGING === "true",
  keepConnectionAlive: process.env.DB_KEEP_CONNECTION_ALIVE === "true",
  migrationsTableName: "migrations",
  migrations: ["dist/src/migrations/*.js"], // where migrations are read from on run, has to be .JS!
  cli: {
    migrationsDir: "src/migrations" // where migrations are created
  },
  migrationsRun: true
};