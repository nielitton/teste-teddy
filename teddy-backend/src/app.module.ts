import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { ClientModule } from './api/clients/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
