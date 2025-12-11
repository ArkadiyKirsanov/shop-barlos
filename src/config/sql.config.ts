import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';

export const sqlConfig = registerAs('database', () => {
  console.log('Loading sqlConfig...');
  
  const config = {
    dialect: <Dialect>'postgres', // Явно указываем
    dialectModule: require('pg'),
    host: 'dpg-d4tehn63jp1c73edo2vg-a.oregon-postgres.render.com',
    port: 5432,
    username: 'arkadiy',
    password: 'ZAx2T7AiaBhYDINXe3xasrGKFGXzhb8T',
    database: 'renderbg_eker',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    autoLoadModels: true,
    synchronize: true,
    logging: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  
  console.log('sqlConfig loaded:', { ...config, password: '***' });
  return config;
});