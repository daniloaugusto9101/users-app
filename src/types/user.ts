export interface User {
    id: number;
    name: string;
    email: string;
    type: 'admin' | 'usuario' | 'gerente';
    status: 'Ativo' | 'Inativo';
}
