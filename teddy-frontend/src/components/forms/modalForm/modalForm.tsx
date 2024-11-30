import { Button, FormControl } from "@mui/material";
import Input from "@mui/joy/Input"
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ModaFormContainer } from "./style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientService } from "../../../services/client.service";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { useState } from "react";
import { IClientEntity } from "../../../models/client.entity";

interface IFormInputs {
    id?: string;
    name: string;
    wage: number;
    enterprise: number;
}

interface IModalForm {
    mode: "create" | "update" | undefined;
    handleClose: () => void;
    clientId?: string;
    client: IClientEntity;
}

function ModalForm({ mode, handleClose, client }: IModalForm) {
    const clientService = new ClientService()
    const queryClient = useQueryClient();
    const { handleSubmit, control } = useForm<IFormInputs>();
    const [valueWage, setValueWage] = useState<number>(0)
    const [valueEnterprise, setValueEnterprise] = useState<number>(0)

    const { mutate: createClient } = useMutation({
        mutationFn: (client: IFormInputs) => clientService.createClient(client),
        onSuccess: () => {
            toast.success("Cliente criado com sucesso");
            handleClose();
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
        onError: (error) => {
            toast.error("Erro ao salvar o cliente: " + error.message);
        }
    })

    const { mutate: updateClient } = useMutation({
        mutationFn: (params: { id: string, client: IFormInputs }) => clientService.updateClient(params.id, params.client),
        onSuccess: () => {
            handleClose();
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            toast.success("Cliente atualizado com sucesso");
        },
        onError: (error) => {
            toast.error("Erro ao atualizar o cliente: " + error.message);
        }
    })

    const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
        if (mode === "create") {
            createClient({
                name: data.name,
                wage: Number(valueWage),
                enterprise: Number(valueEnterprise),
            })
        } else {
            const id = client.id || ''
            updateClient({
                id,
                client: {
                    name: data.name,
                    wage: Number(valueWage),
                    enterprise: Number(valueEnterprise),
                }
            })
        }
    };

    return (
        <ModaFormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormControl component="fieldset">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input defaultValue={mode === "update" ? client.name : ''} variant="outlined" placeholder="Digite o nome" {...field} />}
                />
            </FormControl>
            <FormControl component="fieldset">
                <Controller
                    name="wage"
                    control={control}
                    render={({ field }) =>
                        <NumericFormat
                            {...field}
                            defaultValue={mode === "update" ? client.wage : ''}
                            placeholder="Digite o salário"
                            customInput={Input}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            onValueChange={(values) => {
                                setValueWage(values.floatValue || 0)
                            }}
                        />}
                />
            </FormControl>
            <FormControl component="fieldset">
                <Controller
                    name="enterprise"
                    control={control}
                    render={({ field }) =>
                        <NumericFormat
                            {...field}
                            defaultValue={mode === "update" ? client.enterprise : ''}
                            placeholder="Digite o valor da empresa"
                            customInput={Input}
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            onValueChange={(values) => {
                                setValueEnterprise(values.floatValue || 0)
                            }}
                        />}
                />
            </FormControl>
            <Button type="submit" variant="outlined" style={{ backgroundColor: "var(--primary-color)", color: "white", border: "none" }} className="button-orange">
                {mode === "create" ? "Criar Cliente" : "Editar Cliente"}
            </Button>
        </ModaFormContainer>
    );
}

export default ModalForm;
