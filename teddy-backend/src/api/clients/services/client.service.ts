import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessException } from "../../../core/exception/business-exception";
import { CreateClientDto, UpdateClientDto } from "src/core/models/dto/client.dto";
import { ClientEntity } from "../../../core/models/entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>
    ) { }

    async findAll(page: number = 1, limit: number = 10): Promise<{ clients: ClientEntity[], count: number }> {
        const [clients, count] = await this.clientRepository.findAndCount({
            where: {
                active: true, // Filtro para clientes ativos
            },
            skip: (page - 1) * limit, // Pula os registros das páginas anteriores
            take: limit, // Limita a quantidade de registros por página
        });

        return { clients, count };
    }

    async findOne(id: string): Promise<ClientEntity> {
        const findedClient = await this.clientRepository.findOne({
            where: { id: id, active: true }
        });

        if (!findedClient) {
            throw new BusinessException("Cliente não encontrado", null, 404)
        }

        return findedClient
    }

    async create(data: CreateClientDto): Promise<ClientEntity> {
        return await this.clientRepository.save(data);
    }

    async update(id: string, data: UpdateClientDto) {

        await this.findOne(id)
        await this.clientRepository.update({ id }, data);
        return await this.clientRepository.findOne({ where: { id } })
    }

    // Aqui uso a técnica do soft delete.
    async delete(id: string): Promise<ClientEntity> {
        await this.clientRepository.update({
            id
        }, {
            active: false
        });

        return await this.clientRepository.findOne({ where: { id } })
    }
}