import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';
import { ClientController } from './clients/controllers/client.controller';

@Module({
    imports: [ClientModule],
    controllers: [],
    providers: [],
    exports: [ClientModule],
})
export class ApiModule {}
