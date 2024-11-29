import { Module } from "@nestjs/common";
import { ClientService } from "./services/client.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "src/core/models/entities/client.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ClientEntity])],
    controllers: [],
    providers: [ClientService],
    exports: [ClientService]
})
export class ClientModule {}