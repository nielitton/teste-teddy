import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ClientService } from "../services/client.service";
import { CreateClientDto, UpdateClientDto } from "src/core/models/dto/client.dto";


@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ) {}
   
    @Get('')
    async findAll() {
        return await this.clientService.findAll();
    }

    @Get('/:id')
    async findOne(@Param() { id }) {
        return await this.clientService.findOne(id)
    }

    @Post('')
    async create(@Body() data: CreateClientDto) {
        return await this.clientService.create(data)
    }

    @Delete('/:id')
    async delete(@Param() {id}) {
        return await this.clientService.delete(id)
    }

    @Patch('/:id')
    async update(@Body() data: UpdateClientDto, @Param() { id }) {
        return await this.clientService.update(id, data)
    }
}