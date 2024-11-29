import { Controller, Get } from "@nestjs/common";
import type { ClientService } from "../services/client.service";


@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ) {}
   
    @Get('')
    async findAll() {
        return await this.clientService.findAll();
    }
}