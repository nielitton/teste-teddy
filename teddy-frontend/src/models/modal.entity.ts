import { ReactNode } from "react";

export interface IModal {
    isOpen: boolean;
    handleOpen?: () => void;
    handleClose?: () => void;
    children?: ReactNode;
    id: string;
    name: string
}