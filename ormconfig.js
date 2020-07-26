module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: process.env.DB_ENTITIES.split(' '),
  synchronize: process.env.DB_SYNCHRONIZE,
  autoLoadEntities: true,
  logging: process.env.DB_LOGGING,
}