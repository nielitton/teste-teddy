import apiBase from "../api/api";
import { IClientEntity } from "../models/client.entity";

export interface IClientResponse {
    clients: IClientEntity[];
    count: number;
}

export class ClientService {
    async findAll(page: number, limit: number): Promise<IClientResponse> {
        try {
            const response = await apiBase.get<IClientResponse>(`/client?limit=${limit}&page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter clientes:", error);
            throw error;
        }
    }

    async deleteClient(id: string): Promise<IClientEntity> {
        try {
            const response = await apiBase.delete(`/client/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            throw error;
        }
    }
}
