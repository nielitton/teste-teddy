import { IsNotEmpty, IsNumber, IsOptional, IsString, min, MinLength } from "class-validator";
import { ClientEntity } from "../entities/client.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateClientDto extends ClientEntity{

    @ApiProperty({
        example: 'Nieliton'
    })
    @MinLength(1, { message: 'Nome do cliente precisa ter no minímo uma letra' })
    @IsNotEmpty({ message: 'Você precisa passar um nome para o cliente' })
    @IsString()
    name: string;

    @ApiProperty({
        example: 3500.35
    })
    @IsNotEmpty({ message: 'Você precisa passar um salário para o cliente' })
    @IsNumber()
    wage: number;

    @ApiProperty({
        example: 350000.35
    })
    @IsNotEmpty({ message: 'Você precisa passar um valor da empresa para o cliente' })
    @IsNumber()
    enterprise: number;
}

export class UpdateClientDto {

    @ApiPropertyOptional({
        example: 'Nieliton'
    })
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({
        example: 3500.35
    })
    @IsOptional()
    wage?: number;

    @ApiPropertyOptional({
        example: 3500.35
    })
    @IsOptional()
    enterprise?: number;
}