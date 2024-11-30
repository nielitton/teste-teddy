import { FiPlus } from "react-icons/fi";
import { ClientCardContainer } from "./style";
import { LuPencil } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientService, IClientResponse } from "../../services/client.service";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { useState } from "react";
import { ModalDelete } from "../modal/modalDelete";

interface IClientCard {
    id: string;
    name: string;
    wage: string;
    enterprise: string;
}

function ClientCard({ id, name, wage, enterprise }: IClientCard) {
    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <ClientCardContainer>
            <div className="infos">
                <div>
                    <span className="name">{name}</span>
                </div>
                <div>
                    <span>Salário:</span>
                    <span> {wage}</span>
                </div>
                <div>
                    <span>Empresa:</span>
                    <span> {enterprise}</span>
                </div>
            </div>
            <div className="actions">
                <button><FiPlus className="icon-action" /></button>
                <button><LuPencil className="icon-action" /></button>
                <button><HiOutlineTrash onClick={() => setOpenModal(!openModal)} className="icon-action" color="red" /></button>
            </div>
            <ModalDelete id={id} name={name} isOpen={openModal} handleClose={() => setOpenModal(!openModal)} />
        </ClientCardContainer>
    )
}

export default ClientCard;