import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { ClientModule } from './api/clients/client.module';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from './core/logger/custom.logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ApiModule,
    LoggerModule.forRoot()
  ],
  controllers: [],
  exports: [CustomLogger],
  providers: [CustomLogger],
})
export class AppModule {}
