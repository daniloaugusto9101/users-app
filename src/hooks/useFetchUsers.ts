import UserServices from '@/service/UserServices';
import type { User } from '@/types/user';
import React from 'react';

const useFetchUsers = () => {
    const [users, setUsers] = React.useState<User[]>([]);

    const fetchUsers = () => {
        UserServices.getUsers()
            .then((resp) => {
                setUsers(resp);
            })
            .catch((err) => {
                console.error(`Erro ao tentar recuperar os usuários: ${err}`);
            });
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return { users, fetchUsers };
};

export default useFetchUsers;
