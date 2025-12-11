import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/users.model';
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    // Получаем весь конфиг БД
    const dbConfig = this.configService.get('database');
    
    // Отладочный вывод
    console.log('DB Config keys:', Object.keys(dbConfig || {}));
    
    // ВАЖНО: у вас НЕТ структуры { sql: { ... } }
    // Используйте dbConfig напрямую
    return {
      dialect: dbConfig.dialect || 'postgres',
      logging: dbConfig.logging !== undefined ? dbConfig.logging : true,
      host: dbConfig.host || 'localhost',
      port: dbConfig.port || 5432,
      username: dbConfig.username || 'arkadiy',
      password: dbConfig.password || 'ZAx2T7AiaBhYDINXe3xasrGKFGXzhb8T',
      database: dbConfig.database || 'renderbg_eker',
      
      // SSL для Render
      dialectOptions: dbConfig.dialectOptions || {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      
      models: [User],
      autoLoadModels: true,
      synchronize: true,
      
      // Для PostgreSQL не нужны charset и collate
      // define: {
      //   charset: 'utf8',
      //   collate: 'utf8_general_ci',
      // },
    };
  }
}