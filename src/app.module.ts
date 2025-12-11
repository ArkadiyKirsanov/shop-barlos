import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { sqlConfig } from './config/sql.config'; // ← измените импорт если нужно
import { AuthModule } from './auth/auth.module';
import { BoilerPartsModule } from './boiler-parts/boiler-parts.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    // СНАЧАЛА ConfigModule, потом SequelizeModule
    ConfigModule.forRoot({
      load: [sqlConfig], // ← используем sqlConfig
      envFilePath: '.env', // ← добавляем загрузку .env
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    UsersModule,
    AuthModule,
    BoilerPartsModule,
    ShoppingCartModule,
    PaymentModule,
  ],
})
export class AppModule {}