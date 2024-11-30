import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessException } from "../../../core/exception/business-exception";
import { CreateClientDto, UpdateClientDto } from "src/core/models/dto/client.dto";
import { ClientEntity } from "../../../core/models/entities/client.entity";
import { ILike, Like, Repository } from "typeorm";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>
    ) { }

    async findAll(page: number = 1, limit: number = 10, filterByName?: string): Promise<{ clients: ClientEntity[], count: number }> {
        const where: any = {
            active: true, // Filtro para clientes ativos
        };

        if (filterByName && filterByName.trim() !== '') {
            where.name = ILike(`%${filterByName.trim()}%`);  // Busca com ILIKE (case insensitive)
        }

        const [clients, count] = await this.clientRepository.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
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