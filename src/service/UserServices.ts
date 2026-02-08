import api from "@/config/http";
import type { User } from "@/types/user";

const getUsers = async () => {
    const { data } = await api.get('/users');
    return data;
};
const getUserDetails = async (idUser: string) => {
    const { data } = await api.get(`/users/id/${idUser}`);
    return data;
};

const deleteUser = async (idUser: string) => {
    const { data } = await api.delete(`/users/id/${idUser}`);
    return data;
};

const editUser = async (user: User) => {
    const { data } = await api.put(`/users/${user.id}`, user);
    return data;
};

const createUser = async (user: Omit<User, 'id'>) => {
    const { data } = await api.post(`/users/`, user);
    return data;
};




export default {
    getUsers,
    getUserDetails,
    deleteUser,
    editUser,
    createUser
};
