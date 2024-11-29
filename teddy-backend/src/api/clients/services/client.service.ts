import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientDto } from "src/core/models/dto/client.dto";
import { ClientEntity } from "src/core/models/entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>
    ) {}

    async findAll(): Promise<ClientEntity[]> {
        return await this.clientRepository.find() || [];
    }

    async findOne(id: string): Promise<ClientEntity> {
        return await this.clientRepository.findOne({
            where: { id }
        });
    }

    async create(user: ClientEntity): Promise<ClientEntity> {
        return await this.clientRepository.save(user);
    }

    async update(id: string, client: ClientDto): Promise<ClientEntity> {
        await this.clientRepository.update({ id }, client);

        return await this.clientRepository.findOne({
            where: { id }
        });
    }

    // Aqui uso a técnica do soft delete.
    async delete(id: string): Promise<void> {
        await this.clientRepository.update({
            id
        }, {
            active: false
        });
    }
}