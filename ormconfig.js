module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: ['error'],
  entities: ['dist/common/entity/*.entity.{ts,js}'],
  migrations: ['dist/migration/**/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/common/entity/',
    migrationsDir: 'src/migration/',
  },
  synchronize: false,
  migrationsRun: true,
};
