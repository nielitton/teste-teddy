
interface IClientCard {
    name: string;
    wage: string;
    enterprise: string;
}

function ClientCard({ name, wage, enterprise }: IClientCard) {
    return (
        <div>
            <span>{name}</span>
            <span>{wage}</span>
            <span>{enterprise}</span>
        </div>
    )
}