export interface User {
    id: string;
    name: string;
    email: string;
    profile: 'Admin' | 'Usuário' | 'Gerente';
    status: 'Ativo' | 'Inativo';
    createdAt: string;
}
