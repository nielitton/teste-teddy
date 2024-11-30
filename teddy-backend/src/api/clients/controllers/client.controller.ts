import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ClientService } from "../services/client.service";
import { CreateClientDto, UpdateClientDto } from "../../../core/models/dto/client.dto";
import { ApiParam } from "@nestjs/swagger";


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
    @ApiParam({
        name: 'id',
        type: 'string',
        example: '1',
        description: 'id do cliente'
    })
    async findOne(@Param('id') id: string) {
        return await this.clientService.findOne(id)
    }

    @Post('')
    async create(@Body() data: CreateClientDto) {
        return await this.clientService.create(data)
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        example: '1',
        description: 'id do cliente'
    })
    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.clientService.delete(id)
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        example: '1',
        description: 'id do cliente'
    })
    @Patch('/:id')
    async update(@Body() data: UpdateClientDto, @Param('id') id: string) {
        return await this.clientService.update(id, data)
    }
}