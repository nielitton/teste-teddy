export interface CreateClientDto {
    name: string;
    wage: number;
    enterprise: number;
}

export interface UpdateClientDto {
    name?: string;
    wage?: number;
    enterprise?: number;
}