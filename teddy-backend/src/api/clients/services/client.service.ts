import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessException } from "src/core/exception/business-exception";
import { CreateClientDto, UpdateClientDto } from "src/core/models/dto/client.dto";
import { ClientEntity } from "src/core/models/entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>
    ) {}

    async findAll(): Promise<ClientEntity[]> {

        // Aqui estou implementando o soft delete, onde procuro apenas os clientes com a propriedade "active" = true
        return await this.clientRepository.find({
            where: {
                active: true
            }
        }) || [];
    }

    async findOne(id: string): Promise<ClientEntity> {
        const findedClient = await this.clientRepository.findOne({
            where: { id: id, active: true }
        });

        if(!findedClient) {
            throw new BusinessException("Cliente não encontrado", null, 404)
        }

        return findedClient
    }

    async create(data: ClientEntity): Promise<ClientEntity> {
        return await this.clientRepository.save(data);
    }

    async update(id: string, data: UpdateClientDto) {

        await this.findOne(id)
        await this.clientRepository.update({ id }, data);
        return await this.clientRepository.findOne({ where: { id } })
    }

    // Aqui uso a técnica do soft delete.
    async delete(id: string): Promise<ClientEntity> {
        const clientToDelete = await this.findOne(id)

        await this.clientRepository.update({
            id
        }, {
            active: false
        });

        return await this.clientRepository.findOne({ where: { id }})
    }
}