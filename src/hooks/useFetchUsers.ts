import UserServices from '@/service/UserServices';
import type { User } from '@/types/user';
import React from 'react';

const useFetchUsers = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [isFetchingUsers, setIsFetchingUsers] = React.useState(false);
    const [fetchUsersError, setFetchUsersError] = React.useState<string | null>(null);

    const fetchUsers = async () => {
        setIsFetchingUsers(true);
        setFetchUsersError(null);

        try {
            const resp = await UserServices.getUsers();
            setUsers(resp);
            return resp;
        } catch (err) {
            setFetchUsersError('Erro ao buscar usuários');
            console.error(`Erro ao tentar recuperar os usuários: ${err}`);
            return [];
        } finally {
            setIsFetchingUsers(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        fetchUsers,
        isFetchingUsers,
        fetchUsersError,
    };
};

export default useFetchUsers;