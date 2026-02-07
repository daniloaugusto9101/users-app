export interface User {
    id: string;
    name: string;
    email: string;
    type: 'Admin' | 'Usuário' | 'Gerente';
    status: 'Ativo' | 'Inativo';
    createdAt: string;
}
