import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const DatabaseConfig = TypeOrmModule.forRootAsync({
  useFactory: async (): Promise<DataSourceOptions> => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/database/migrations/*{.ts,.js}'],
    logging: process.env.APP_ENV === 'local',
    synchronize: false,
    migrationsRun: true,
    migrationsTransactionMode: 'all',
    useUTC: true,
  }),
  async dataSourceFactory(options: DataSourceOptions): Promise<DataSource> {
    try {
      const dataSource = new DataSource(options);
      return addTransactionalDataSource(dataSource);
    } catch (error) {
      console.error('Failed to create transactional DataSource:', error);
      throw error;
    }
  },
});
