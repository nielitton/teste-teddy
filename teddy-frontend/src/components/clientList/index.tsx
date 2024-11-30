import { useState } from "react";
import { ClientService, IClientResponse } from "../../services/client.service";
import ClientCard from "../clientCard/clientCard";
import { ClientListContainer } from "./style";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const ClientList = () => {
    const clientService = new ClientService();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(12);

    const { data: clients, isLoading, isError, error } = useQuery<IClientResponse>({
        queryKey: ["clients", currentPage, limit],
        queryFn: async () => {
            try {
                const data = await clientService.findAll(currentPage, limit);
                return data;
            } catch (err) {
                throw new Error("Não foi possível carregar os clientes.");
            }
        },
        placeholderData: { clients: [], count: 0 },
        select: (data) => ({ clients: data.clients, count: data.count }),
    });

    if (isLoading) return <div>Carregando...</div>;
    if (isError) return <div>{error.message}</div>;

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const options = Array.from(
        { length: Math.floor(clients?.count || 0 / 4) },
        (_, index) => (index + 1) * 4
    );

    const generatePageNumbers = () => {
        const totalPages = clients !== undefined && Math.ceil(clients?.count / limit) || 0;
        let pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <ClientListContainer>
            <div className="header-list-container">
                <div>
                    <span className="bold">{clients?.count}</span> Clientes encontrados:
                </div>
                <div>
                    Clientes por página:
                    <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="limit-page-select">
                        {options.map(optionItem => <option value={optionItem}>{optionItem}</option>)}
                    </select>
                </div>
            </div>
            <ul>
                {clients?.clients.map((client) => (
                    <ClientCard id={client.id} key={client.id} enterprise={client.enterprise} name={client.name} wage={client.wage} />
                ))}
            </ul>
            <Button className="button-create" variant="outlined">
                Criar cliente
            </Button>
            <div className="pagination">
                <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    &lt;
                </Button>
                {generatePageNumbers().map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={currentPage === pageNumber ? "active-page" : ""}
                    >
                        {pageNumber}
                    </Button>
                ))}
                <Button
                    onClick={handleNextPage}
                    disabled={clients?.count !== undefined && currentPage === Math.ceil(clients?.count / limit)}
                >
                    &gt;
                </Button>
            </div>
        </ClientListContainer>
    );
};

export default ClientList;
