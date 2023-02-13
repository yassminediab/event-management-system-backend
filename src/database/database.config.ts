import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    url:
      process.env.PG_URL ??
      `postgres://postgres:changeme@127.0.0.1/event-management-system`,
    synchronize: false,
    migrationsTableName: `schema_migrations`,
    type: 'postgres',
    logging: true,
    entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
    migrationsRun: false,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  };
});
