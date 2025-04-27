import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'postgres',
      url: configService.get('POSTGRES_URL'),
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
