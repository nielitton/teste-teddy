import { Module } from '@nestjs/common';
import { ClientModule } from './clients/client.module';

@Module({
    imports: [ClientModule],
    providers: [],
    exports: [],
})
export class ApiModule {}
